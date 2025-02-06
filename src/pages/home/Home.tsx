import useTitle from '../../hooks/useTitle';
import Banner from './Banner';
import BusinessOverview from './BusinessOverview';
import CompanyLogo from './CompanyLogo';
import FeaturedProducts from './FeaturedProducts';
import ImageGallery from './ImageGallery';
import OurLocation from './OurLocation';
import Reviews from './Reviews';

const Home = () => {
  useTitle('Home');
  return (
    <div className="lg:max-w-7xl lg:mx-auto px-5">
      <Banner />
      <CompanyLogo />
      <FeaturedProducts />
      <BusinessOverview />
      <ImageGallery />
      <Reviews />
      <OurLocation />
    </div>
  );
};

export default Home;
