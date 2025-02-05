import { Button, Col, Flex } from 'antd';
import CustomForm from '../../../components/form/CustomForm';
import CustomSelect from '../../../components/form/CustomSelect';
import CustomInput from '../../../components/form/CustomInput';
import { FieldValues, SubmitHandler } from 'react-hook-form';
import { toast } from 'sonner';
import { useAddProductMutation } from '../../../redux/features/product/productApi';
import { categoryOptions } from '../../../constants/product';
import CustomTextArea from '../../../components/form/CustomTextArea';
import CustomUpload from '../../../components/form/CustomUpload';
import { useNavigate } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { productSchema } from '../../../schemas/product.schema';
import { TProduct } from '../../../types/product.type';
import { TResponse } from '../../../types';

const CreateProduct = () => {
  const [addProduct] = useAddProductMutation();
  const navigate = useNavigate();

  const imgHostingToken = import.meta.env.VITE_IMAGE_UPLOAD_TOKEN; // Corrected
  const imgHostingURL = `https://api.imgbb.com/1/upload?key=${imgHostingToken}`;

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading('Creating...');

    try {
      const formData = new FormData();
      formData.append('image', data.image);

      const response = await fetch(imgHostingURL, {
        method: 'POST',
        body: formData,
      });

      const imgResult = await response.json();

      if (!imgResult.success) {
        throw new Error('Image upload failed!');
      }

      const imgURL = imgResult.data.display_url;
      const productData = {
        name: data.name,
        brand: data.brand,
        price: Number(data.price),
        category: data.category,
        description: data.description,
        quantity: Number(data.quantity),
        image: imgURL,
      };

      const res = (await addProduct(productData)) as TResponse<TProduct | any>;

      if (res.error) {
        toast.error(res.error.data.message, { id: toastId, duration: 2000 });
      } else {
        toast.success(res.data.message, { id: toastId, duration: 2000 });
        navigate('/admin/manage-products');
      }
    } catch (error) {
      toast.error('Something went wrong', { id: toastId, duration: 2000 });
    }
  };

  return (
    <div>
      <h2>Add Product</h2>
      <Flex justify="center" align="center">
        <Col sm={18} lg={8}>
          <CustomForm onSubmit={onSubmit} resolver={zodResolver(productSchema)}>
            <CustomInput type="text" name="name" label="Name" />
            <CustomInput type="text" name="brand" label="Brand" />
            <CustomInput type="text" name="price" label="Price" />
            <CustomSelect
              label="Category"
              name="category"
              options={categoryOptions}
            />
            <CustomTextArea name="description" label="Description" />

            <CustomInput type="number" name="quantity" label="Quantity" />

            <CustomUpload name="image" />

            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </CustomForm>
        </Col>
      </Flex>
    </div>
  );
};

export default CreateProduct;
