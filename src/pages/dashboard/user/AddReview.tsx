import { Star } from 'lucide-react';
import { useEffect, useState } from 'react';
import CustomForm from '../../../components/form/CustomForm';
import { zodResolver } from '@hookform/resolvers/zod';
import CustomInput from '../../../components/form/CustomInput';
import CustomSelect from '../../../components/form/CustomSelect';
import CustomTextArea from '../../../components/form/CustomTextArea';
import { toast } from 'sonner';
import { FieldValues, SubmitHandler } from 'react-hook-form';
import { reviewSchema } from '../../../schemas/review.schema';
import { useAddReviewMutation } from '../../../redux/features/review/reviewApi';
import { TResponse } from '../../../types';
import { TReview } from '../../../types/review.type';
import { Button, Card, Col } from 'antd';
import { useAppSelector } from '../../../redux/hooks';
import { selectCurrentUser } from '../../../redux/features/auth/authSlice';
import useTitle from '../../../hooks/useTitle';

type TCountry = {
  name: {
    common: string;
    official: string;
    nativeName?: {
      [key: string]: {
        official: string;
        common: string;
      };
    };
  };
};

const AddReview = () => {
  useTitle('Add Review');
  const user = useAppSelector(selectCurrentUser);
  const [countries, setCountries] = useState<TCountry[]>([]);
  const [rating, setRating] = useState<number>(0);
  const totalStars = 5 as number;

  const [addReview] = useAddReviewMutation();

  const defaultValues = {
    name: user?.name,
  };

  useEffect(() => {
    fetch('https://restcountries.com/v3.1/all')
      .then((res) => res.json())
      .then((data) => setCountries(data));
  }, []);

  const categoryOptions = countries?.map((item) => ({
    value: item.name.common,
    label: item.name.common,
  }));

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading('Creating...');

    if (rating === 0) {
      toast.error('Please select a star rating before submitting.');
      return;
    }

    const reviewData = {
      name: data.name,
      location: data.location,
      rating: rating,
      description: data.description,
    };

    try {
      const res = (await addReview(reviewData)) as TResponse<TReview | any>;

      if (res.error) {
        toast.error(res.error.data.message, { id: toastId, duration: 2000 });
      } else {
        toast.success(res.data.message, { id: toastId, duration: 2000 });
        setRating(0);
      }
    } catch (error) {
      toast.error('Something went wrong', { id: toastId, duration: 2000 });
    }
  };

  return (
    <div className="lg:m-8">
      <Card
        title="Give a Review"
        bordered={false}
        style={{
          maxWidth: '500px',
          margin: '20px auto',
          paddingBottom: '15px',
        }}
      >
        <Col sm={24} lg={24}>
          <CustomForm
            onSubmit={onSubmit}
            resolver={zodResolver(reviewSchema)}
            defaultValues={defaultValues}
          >
            <div className="text-center mb-5">
              <div className="flex gap-1 justify-center items-center">
                {Array.from({ length: totalStars }, (_, index) => (
                  <Star
                    key={index}
                    className={`w-6 h-6 cursor-pointer ${
                      index < rating
                        ? 'text-yellow-500 fill-yellow-500'
                        : 'text-gray-400'
                    }`}
                    onClick={() => setRating(index + 1)}
                  />
                ))}
              </div>
            </div>
            <CustomInput type="text" name="name" label="Name" />
            <CustomSelect
              label="Country"
              name="location"
              options={categoryOptions}
            />
            <CustomTextArea name="description" label="Message" />
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </CustomForm>
        </Col>
      </Card>
    </div>
  );
};

export default AddReview;
