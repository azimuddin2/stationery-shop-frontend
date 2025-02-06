import { useParams } from 'react-router-dom';
import { useGetProductByIdQuery } from '../../redux/features/product/productApi';
import { useAppDispatch } from '../../redux/hooks';
import { addToCart } from '../../redux/features/cart/cartSlice';
import { toast } from 'sonner';
import Loading from '../../components/shared/Loading';
import { MdOutlineShoppingCart } from 'react-icons/md';

const ProductDetail = () => {
  const { id } = useParams();
  const { data: product, isLoading } = useGetProductByIdQuery(id);
  const dispatch = useAppDispatch();

  if (isLoading) {
    return <Loading />;
  }

  const { image, name, price, description } = product?.data;

  const handleAddtoCart = () => {
    dispatch(addToCart(product?.data));
    toast.success('Product successfully added to cart.', { duration: 2000 });
  };

  return (
    <section className="lg:max-w-5xl lg:mx-auto px-5 my-12">
      <h1 className="text-2xl font-medium mb-5">{name}</h1>
      <img src={image} alt={name} className="w-96 rounded" />
      <p className="text-lg mt-4 font-medium">Price: ${price}</p>
      <p className="text-accent">{description}</p>
      <button
        onClick={handleAddtoCart}
        className="bg-[#3F90FC] hover:bg-[#1677ff] text-white cursor-pointer px-6 py-1 rounded-sm flex justify-center items-center mt-5"
      >
        <MdOutlineShoppingCart size={20} className="mr-1" />
        <span>Add to Cart</span>
      </button>
    </section>
  );
};

export default ProductDetail;
