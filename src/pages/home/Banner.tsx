import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation, A11y } from 'swiper/modules';
import writing from '../../assets/images/writing.jpg';
import officeSupplies from '../../assets/images/office-supplies.jpg';
import artSupplies from '../../assets/images/art-supplies.jpg';
import educational from '../../assets/images/educational.jpg';
import technology from '../../assets/images/technology.jpg';
import CustomButton from '../../components/shared/CustomButton';
import { Link } from 'react-router-dom';
import { IoArrowForwardCircleOutline } from 'react-icons/io5';
import { Fade } from 'react-awesome-reveal';
import '../../styles/Home.css';

type TBookData = {
  id: number;
  image: string;
};

const booksData: TBookData[] = [
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
];

const Banner = () => {
  return (
    <section className="lg:flex lg:flex-row-reverse items-center justify-center lg:my-12 gap-5">
      <Swiper
        className="mySwiper flex-1"
        style={
          {
            '--swiper-pagination-color': '#3F90FC',
            '--swiper-pagination-bullet-inactive-color': '#999999',
            '--swiper-pagination-bullet-inactive-opacity': '1',
            '--swiper-pagination-bullet-size': '12px',
            '--swiper-pagination-bullet-horizontal-gap': '3px',
            '--swiper-navigation-color': '#3F90FC',
            '--swiper-navigation-size': '18px',
          } as React.CSSProperties
        }
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
            <img
              src={book.image}
              className="mb-5 w-full mx-auto rounded-3xl p-5"
            />
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="flex-1 mt-5 lg:mt-0">
        <Fade
          cascade
          damping={1e-1}
          className="text-primary text-3xl lg:text-5xl"
        >
          Sale up to 30% off.
        </Fade>
        <h2 className="text-2xl lg:text-3xl text-secondary font-bold my-3">
          Elevate Your Desk with Premium Stationery Shop
        </h2>
        <p className="text-accent mb-5">
          Our stationery shop offers a wide range of high-quality products,
          including notebooks, pens, pencils, sticky notes, highlighters, and
          more. Whether you're a student, professional, or artist, we have
          everything you need to stay organized and creative.
        </p>
        <Link to="/products">
          <CustomButton>
            <span>Buy Now</span>
            <IoArrowForwardCircleOutline className="text-xl ml-1" />
          </CustomButton>
        </Link>
      </div>
    </section>
  );
};

export default Banner;
