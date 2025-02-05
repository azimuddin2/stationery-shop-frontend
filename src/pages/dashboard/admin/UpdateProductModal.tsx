import { Button, Modal } from 'antd';
import { useState } from 'react';
import CustomForm from '../../../components/form/CustomForm';
import CustomInput from '../../../components/form/CustomInput';
import CustomSelect from '../../../components/form/CustomSelect';
import { categoryOptions } from '../../../constants/product';
import CustomTextArea from '../../../components/form/CustomTextArea';
import { FieldValues, SubmitHandler } from 'react-hook-form';
import { useUpdateProductMutation } from '../../../redux/features/product/productApi';
import { TProduct } from '../../../types/product.type';
import { toast } from 'sonner';
import { TResponse } from '../../../types';

type UpdateProductModalProps = {
  productInfo: TProduct;
  refetch: () => void;
};

const UpdateProductModal = ({
  productInfo,
  refetch,
}: UpdateProductModalProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updateProduct, { isLoading }] = useUpdateProductMutation();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading('Updating...');

    try {
      const productData = {
        name: data.name,
        brand: data.brand,
        price: Number(data.price),
        category: data.category,
        description: data.description,
        quantity: Number(data.quantity),
      };
      const res = (await updateProduct({
        id: productInfo._id,
        body: productData,
      })) as TResponse<TProduct | any>;

      if (res.error) {
        toast.error(res.error.data.message, { id: toastId });
      } else {
        toast.success(res.data.message, { id: toastId });
        setIsModalOpen(false);
        refetch();
      }
    } catch (error) {
      toast.error('Something went wrong', { id: toastId });
    }
  };

  return (
    <>
      <Button onClick={showModal}>Update</Button>
      <Modal
        title={productInfo.name}
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <CustomForm onSubmit={onSubmit} defaultValues={productInfo}>
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

          {/* <CustomUpload type="file" name="image" label="Upload Picture" /> */}

          <Button type="primary" htmlType="submit" loading={isLoading}>
            Submit
          </Button>
        </CustomForm>
      </Modal>
    </>
  );
};

export default UpdateProductModal;
