import { Button, Spin } from 'antd';
import { useParams } from 'react-router-dom';
import { useGetProductByIdQuery } from '../../redux/features/product/productApi';
import { useAppDispatch } from '../../redux/hooks';
import { addToCart } from '../../redux/features/cart/cartSlice';
import { toast } from 'sonner';

const ProductDetail = () => {
  const { id } = useParams();
  const { data: product, isLoading } = useGetProductByIdQuery(id);
  const dispatch = useAppDispatch();

  if (isLoading) {
    return <Spin tip="Loading Product..." />;
  }

  const { image, name, price, description } = product?.data;

  const handleAddtoCart = () => {
    dispatch(addToCart(product?.data));
    toast.success('Product successfully added to cart.', { duration: 2000 });
  };

  return (
    <div className="max-w-3xl mx-auto p-5">
      <h1 className="text-2xl font-bold">{name}</h1>
      <img src={image} alt={name} className="w-96 object-cover" />
      <p className="text-lg mt-4">Price: ${price}</p>
      <p>{description}</p>
      <Button
        onClick={handleAddtoCart}
        type="primary"
        size="large"
        className="mt-5"
      >
        Add to Cart
      </Button>
    </div>
  );
};

export default ProductDetail;
