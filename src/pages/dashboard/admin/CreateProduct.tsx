import { Button, Card, Col, Row } from 'antd';
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
import useTitle from '../../../hooks/useTitle';

const CreateProduct = () => {
  useTitle('Add Product');
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
        quantity: Number(data.quantity),
        description: data.description,
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
    <div className="lg:m-8">
      <Card
        title="Add Product"
        bordered={false}
        style={{
          maxWidth: '900px',
          margin: '20px auto',
          paddingBottom: '20px',
        }}
      >
        <Col sm={24} lg={24}>
          <CustomForm onSubmit={onSubmit} resolver={zodResolver(productSchema)}>
            <Row gutter={12}>
              <Col span={24} md={{ span: 24 }} lg={{ span: 24 }}>
                <CustomInput type="text" name="name" label="Name" />
              </Col>
            </Row>

            <Row gutter={12}>
              <Col span={24} md={{ span: 12 }} lg={{ span: 12 }}>
                <CustomInput type="text" name="brand" label="Brand" />
              </Col>
              <Col span={24} md={{ span: 12 }} lg={{ span: 12 }}>
                <CustomInput type="text" name="price" label="Price" />
              </Col>
            </Row>

            <Row gutter={12}>
              <Col span={24} md={{ span: 12 }} lg={{ span: 12 }}>
                <CustomSelect
                  label="Category"
                  name="category"
                  options={categoryOptions}
                />
              </Col>
              <Col span={24} md={{ span: 12 }} lg={{ span: 12 }}>
                <CustomInput type="number" name="quantity" label="Quantity" />
              </Col>
            </Row>

            <Row gutter={12}>
              <Col span={24} md={{ span: 24 }} lg={{ span: 24 }}>
                <CustomUpload name="image" />
              </Col>
            </Row>

            <Row gutter={12}>
              <Col span={24} md={{ span: 24 }} lg={{ span: 24 }}>
                <CustomTextArea name="description" label="Description" />
              </Col>
            </Row>

            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </CustomForm>
        </Col>
      </Card>
    </div>
  );
};

export default CreateProduct;
