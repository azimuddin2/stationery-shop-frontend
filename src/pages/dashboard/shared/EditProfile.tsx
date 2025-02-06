import { Button, Card, Col } from 'antd';
import { selectCurrentUser } from '../../../redux/features/auth/authSlice';
import { useAppSelector } from '../../../redux/hooks';
import CustomForm from '../../../components/form/CustomForm';
import CustomInput from '../../../components/form/CustomInput';
import CustomUpload from '../../../components/form/CustomUpload';
import { zodResolver } from '@hookform/resolvers/zod';
import { updateUserSchema } from '../../../schemas/auth.schema';
import { FieldValues, SubmitHandler } from 'react-hook-form';
import { toast } from 'sonner';
import { useUpdateUserMutation } from '../../../redux/features/user/userApi';
import { TResponse } from '../../../types';
import { TRegisterUser } from '../../../types/user.type';
import useTitle from '../../../hooks/useTitle';

const EditProfile = () => {
  useTitle('Edit Profile');
  const user = useAppSelector(selectCurrentUser);
  const [updateUser] = useUpdateUserMutation();

  const defaultValues = {
    name: user?.name,
    email: user?.email,
  };

  const imgHostingToken = import.meta.env.VITE_IMAGE_UPLOAD_TOKEN;
  const imgHostingURL = `https://api.imgbb.com/1/upload?key=${imgHostingToken}`;

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading('Updating...');

    try {
      let imgURL;

      if (data.image) {
        const formData = new FormData();
        formData.append('image', data.image);

        const response = await fetch(imgHostingURL, {
          method: 'POST',
          body: formData,
        });

        const imgResult = await response.json();

        if (imgResult.success) {
          imgURL = imgResult.data.display_url;
        } else {
          toast.error('Image upload failed!');
          return;
        }
      }

      // ✅ Update database with or without a new image
      const updateData = {
        email: user?.email,
        data: {
          name: data.name,
          address: data.address,
          image: imgURL,
        },
      };

      const res = (await updateUser(updateData)) as TResponse<
        TRegisterUser | any
      >;

      if (res.error) {
        toast.error(res.error.data.message, { id: toastId });
      } else {
        toast.success(res.data.message, { id: toastId });
      }
    } catch (error) {
      toast.error('Something went wrong', { id: toastId });
    }
  };

  return (
    <div className="lg:m-8">
      <Card
        title="Edit Profile"
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
            defaultValues={defaultValues}
            resolver={zodResolver(updateUserSchema)}
          >
            <CustomInput type="text" name="name" label="Name" />
            <CustomInput type="email" name="email" label="Email" disabled />
            <CustomInput type="text" name="address" label="Address" />
            <CustomUpload name="image" />
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </CustomForm>
        </Col>
      </Card>
    </div>
  );
};

export default EditProfile;
