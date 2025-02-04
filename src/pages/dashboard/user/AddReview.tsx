import { Star } from 'lucide-react';
import { useEffect, useState } from 'react';
import CustomForm from '../../../components/form/CustomForm';
import { zodResolver } from '@hookform/resolvers/zod';
import CustomInput from '../../../components/form/CustomInput';
import CustomSelect from '../../../components/form/CustomSelect';
import CustomTextArea from '../../../components/form/CustomTextArea';
import CustomButton from '../../../components/shared/CustomButton';
import { toast } from 'sonner';
import { FieldValues, SubmitHandler } from 'react-hook-form';
import { reviewSchema } from '../../../schemas/review.schema';
import { useAddReviewMutation } from '../../../redux/features/review/reviewApi';
import { TResponse } from '../../../types';
import { TReview } from '../../../types/review.type';

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
  const [countries, setCountries] = useState<TCountry[]>([]);
  const [rating, setRating] = useState<number>(0);
  const totalStars = 5 as number;

  const [addReview] = useAddReviewMutation();

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
    <div className="my-12">
      <div className="px-5 py-8 lg:p-12 w-11/12 lg:w-xl mx-auto bg-[#ffffff] rounded">
        <CustomForm onSubmit={onSubmit} resolver={zodResolver(reviewSchema)}>
          <div className="text-center mb-6">
            <h2 className="text-xl font-medium mb-2">Give a Review!</h2>
            <div className="flex gap-1 justify-center items-center mt-6">
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
          <CustomButton>Submit</CustomButton>
        </CustomForm>
      </div>
    </div>
  );
};

export default AddReview;
