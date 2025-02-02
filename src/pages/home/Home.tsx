import Banner from './Banner';
import CompanyLogo from './CompanyLogo';
import FeaturedProducts from './FeaturedProducts';
import ImageGallery from './ImageGallery';

const Home = () => {
  return (
    <div className="lg:max-w-7xl lg:mx-auto px-5">
      <Banner />
      <CompanyLogo />
      <FeaturedProducts />
      <ImageGallery />
    </div>
  );
};

export default Home;
