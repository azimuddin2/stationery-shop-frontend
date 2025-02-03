import Banner from './Banner';
import BusinessOverview from './BusinessOverview';
import CompanyLogo from './CompanyLogo';
import FeaturedProducts from './FeaturedProducts';
import ImageGallery from './ImageGallery';
import OurLocation from './OurLocation';

const Home = () => {
  return (
    <div className="lg:max-w-7xl lg:mx-auto px-5">
      <Banner />
      <CompanyLogo />
      <FeaturedProducts />
      <BusinessOverview />
      <ImageGallery />
      <OurLocation />
    </div>
  );
};

export default Home;
