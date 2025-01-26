import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation, A11y } from 'swiper/modules';
import book1 from '../../assets/images/book1.png';
import book2 from '../../assets/images/book2.png';
import book3 from '../../assets/images/book3.png';
import book4 from '../../assets/images/book4.png';
import book5 from '../../assets/images/book5.png';
import book6 from '../../assets/images/book6.png';
import book7 from '../../assets/images/book7.png';
import book8 from '../../assets/images/book8.png';
import '../../styles/Home.css';

const Banner = () => {
  const booksData = [
    {
      _id: 1,
      image: book1,
    },
    {
      _id: 2,
      image: book2,
    },
    {
      _id: 3,
      image: book3,
    },
    {
      _id: 4,
      image: book4,
    },
    {
      _id: 5,
      image: book5,
    },
    {
      _id: 6,
      image: book6,
    },
    {
      _id: 7,
      image: book7,
    },
    {
      _id: 8,
      image: book8,
    },
  ];

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
          <SwiperSlide key={book._id}>
            <img src={book.image} className="mb-16 mx-auto w-80 p-5" />
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
        <button className="bg-[#3F90FC] text-white px-8 py-2 rounded-sm">
          Buy Now
        </button>
      </div>
    </section>
  );
};

export default Banner;
