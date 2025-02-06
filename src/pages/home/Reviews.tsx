import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation, A11y } from 'swiper/modules';
import { useGetAllReviewsQuery } from '../../redux/features/review/reviewApi';
import ReviewCard from '../../components/shared/ReviewCard';
import Loading from '../../components/shared/Loading';

const Reviews = () => {
  const { data: reviewsData, isLoading } = useGetAllReviewsQuery([]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <section className="my-12 max-w-screen-lg lg:mx-auto">
      <div className="text-center">
        <h1 className="font-medium text-2xl lg:text-3xl leading-snug text-secondary">
          What Our Customers Says
        </h1>
        <p className="lg:w-3/5 mx-auto text-accent leading-6 mt-2 capitalize text-sm">
          The Majority Have Suffered Alteration In Some Form, By Injected
          Humour, Or Randomised Words Which Don't Look Even Slightly Believable.
        </p>
      </div>
      <Swiper
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
        className="mySwiper"
        breakpoints={{
          576: {
            width: 576,
            slidesPerView: 1,
          },
          768: {
            width: 1024,
            slidesPerView: 2,
          },
          1024: {
            width: 1024,
            slidesPerView: 2,
          },
        }}
        modules={[A11y, Navigation, Pagination, Autoplay]}
        spaceBetween={0}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          dynamicBullets: true,
        }}
        navigation={true}
      >
        {reviewsData?.data?.map((item) => (
          <SwiperSlide className="lg:px-2 pt-8 pb-10" key={item._id}>
            <ReviewCard item={item} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Reviews;
