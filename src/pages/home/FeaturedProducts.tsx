import { Link } from 'react-router-dom';
import ProductCard from '../../components/shared/ProductCard';
import { useGetAllProductQuery } from '../../redux/features/product/productApi';
import { IoArrowForwardCircleOutline } from 'react-icons/io5';

const FeaturedProducts = () => {
  const { data: productsData, isFetching } = useGetAllProductQuery([]);

  const productsCollection = productsData?.data?.slice(0, 6);

  return (
    <section className="my-12">
      <h1 className="text-center text-3xl my-5">All Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {productsCollection?.map((item) => (
          <ProductCard key={item._id} item={item} />
        ))}
      </div>
      <div className="mt-10 text-center">
        <Link to="/products">
          <button className="bg-[#181818] px-8 rounded-sm py-1 text-white flex items-center justify-center">
            <span>View All</span>
            <IoArrowForwardCircleOutline className="text-xl" />
          </button>
        </Link>
      </div>
    </section>
  );
};

export default FeaturedProducts;
