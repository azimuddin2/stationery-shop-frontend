import { useNavigate } from 'react-router-dom';
import { TProduct } from '../../types/product.type';

const ProductCard = ({ item }: Partial<TProduct | any>) => {
  const navigate = useNavigate();
  const { image, name, price } = item;

  return (
    <div className="w-96 border border-gray-200 p-5 rounded-xl">
      <img src={image} alt="" className="w-full" />
      <h2>{name}</h2>
      <p>${price}</p>
      <button
        onClick={() => navigate(`/products/${item._id}`)}
        className="bg-[#3F90FC] text-white px-8 py-2 rounded-sm cursor-pointer"
      >
        Buy Now
      </button>
    </div>
  );
};

export default ProductCard;
