import { Link } from 'react-router-dom';
import ProductCard from '../../components/shared/ProductCard';
import { useGetAllProductQuery } from '../../redux/features/product/productApi';
import { IoArrowForwardCircleOutline } from 'react-icons/io5';

const FeaturedProducts = () => {
  const { data: productsData, isFetching } = useGetAllProductQuery([]);

  const productsCollection = productsData?.data?.slice(0, 6);

  return (
    <section className="my-12">
      <div className="text-center mb-8 lg:w-2xl mx-auto">
        <h2 className="font-medium text-2xl lg:text-3xl leading-snug text-secondary">
          Our Products
        </h2>
        <p className="text-accent mt-2">
          Our stationery shop offers high-quality notebooks, pens, pencils, and
          more—perfect for students, professionals, and artists.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {productsCollection?.map((item) => (
          <ProductCard key={item._id} item={item} />
        ))}
      </div>
      <Link to="/products" className="mt-10 flex justify-center items-center">
        <button className="bg-[#181818] hover:bg-[#676767] cursor-pointer px-12 rounded-sm py-1 text-white flex items-center justify-center">
          <span>View All</span>
          <IoArrowForwardCircleOutline className="text-xl ml-1" />
        </button>
      </Link>
    </section>
  );
};

export default FeaturedProducts;
