import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation, A11y } from 'swiper/modules';
import writing from '../../assets/images/writing.jpg';
import officeSupplies from '../../assets/images/office-supplies.jpg';
import artSupplies from '../../assets/images/art-supplies.jpg';
import educational from '../../assets/images/educational.jpg';
import technology from '../../assets/images/technology.jpg';
import technology1 from '../../assets/images/technology1.jpg';
import '../../styles/Home.css';
import CustomButton from '../../components/shared/CustomButton';
import { Link } from 'react-router-dom';

const booksData = [
  {
    id: 1,
    image: writing,
  },
  {
    id: 2,
    image: officeSupplies,
  },
  {
    id: 3,
    image: artSupplies,
  },
  {
    id: 4,
    image: educational,
  },
  {
    id: 5,
    image: technology,
  },
  {
    id: 6,
    image: technology1,
  },
];

const Banner = () => {
  return (
    <section className="lg:flex lg:flex-row-reverse items-center justify-center lg:my-16">
      <Swiper
        className="mySwiper flex-1"
        style={{
          '--swiper-pagination-color': '#3F90FC',
          '--swiper-pagination-bullet-inactive-color': '#999999',
          '--swiper-pagination-bullet-inactive-opacity': '1',
          '--swiper-pagination-bullet-size': '12px',
          '--swiper-pagination-bullet-horizontal-gap': '3px',

          '--swiper-navigation-color': '#3F90FC',
          '--swiper-navigation-size': '18px',
        }}
        modules={[A11y, Pagination, Navigation, Autoplay]}
        spaceBetween={18}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        navigation={true}
        pagination={{
          dynamicBullets: true,
        }}
      >
        {booksData?.map((book) => (
          <SwiperSlide key={book.id}>
            <img src={book.image} className="mb-16 mx-auto rounded-3xl p-5" />
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="flex-1">
        <h1 className="text-primary text-5xl">Sale up to 30% off</h1>
        <h2 className="text-3xl text-secondary font-bold">
          Elevate Your Desk with Premium Stationery
        </h2>
        <p className="text-accent">
          Discover premium stationery that inspires creativity and productivity.
          From elegant notebooks and quality pens to vibrant art supplies and
          planning essentials, we bring the tools you need to organize, create,
          and express your ideas beautifully.
        </p>
        <Link to="/products">
          <CustomButton>Buy Now</CustomButton>
        </Link>
      </div>
    </section>
  );
};

export default Banner;
