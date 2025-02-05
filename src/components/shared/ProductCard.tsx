import { useNavigate } from 'react-router-dom';
import { TProduct } from '../../types/product.type';
import { MdOutlineShoppingCart } from 'react-icons/md';

const ProductCard = ({ item }: Partial<TProduct | any>) => {
  const navigate = useNavigate();
  const { image, name, price } = item;

  return (
    <div className="shadow rounded-sm p-3">
      <img src={image} alt={name} className="w-full rounded-sm" />
      <div className="p-4">
        <h2 className="text-xl">{name}</h2>
        <p className="font-medium text-lg mb-3">${price}</p>
        <button
          onClick={() => navigate(`/products/${item._id}`)}
          className="bg-[#3F90FC] hover:bg-[#1677ff] text-white cursor-pointer px-6 py-1 rounded-sm flex justify-center items-center"
        >
          <MdOutlineShoppingCart size={20} className="mr-1" />
          <span>Buy Now</span>
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
