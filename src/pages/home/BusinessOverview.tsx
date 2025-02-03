import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';
import productsImg from '../../assets/images/products.png';
import customersImg from '../../assets/images/customers.png';
import revenueImg from '../../assets/images/revenue.png';
import feedbacksImg from '../../assets/images/feedbacks.png';

const BusinessOverview = () => {
  const { ref, inView } = useInView({ triggerOnce: true });

  return (
    <section className="my-16">
      <div className="mb-8">
        <h1 className="text-center text-secmondary uppercase text-3xl font-medium mb-3 lg:mb-1">
          Millions of Clients trust us
        </h1>
        <h3 className="text-center capitalize text-accent text-xl">
          try to understand Customer expectation
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="shadow rounded">
          <div className="text-center py-6" ref={ref}>
            <img
              src={productsImg}
              alt="Products"
              className="mb-5 w-20 mx-auto"
            />
            <h2 className="text-3xl text-secondary">
              {inView && <CountUp start={1} end={100} duration={2} delay={0} />}
              K
            </h2>
            <h3 className="text-xl text-primary font-medium">Our Products</h3>
          </div>
        </div>

        <div className="shadow rounded">
          <div className="text-center py-6" ref={ref}>
            <img
              src={customersImg}
              alt="Customers"
              className="mb-5 w-20 mx-auto"
            />
            <h2 className="text-3xl text-secondary">
              {inView && <CountUp start={1} end={300} duration={2} delay={0} />}
              K
            </h2>
            <h3 className="text-xl text-primary font-medium">
              Happy Customers
            </h3>
          </div>
        </div>

        <div className="shadow rounded">
          <div className="text-center py-6" ref={ref}>
            <img src={revenueImg} alt="Revenue" className="mb-5 w-20 mx-auto" />
            <h2 className="text-3xl text-secondary">
              {inView && <CountUp start={1} end={200} duration={2} delay={0} />}
              M
            </h2>
            <h3 className="text-xl text-primary font-medium">Annual Revenue</h3>
          </div>
        </div>

        <div className="shadow rounded">
          <div className="text-center py-6" ref={ref}>
            <img
              src={feedbacksImg}
              alt="Products"
              className="mb-5 w-20 mx-auto"
            />
            <h2 className="text-3xl text-secondary">
              {inView && <CountUp start={1} end={44} duration={2} delay={0} />}K
            </h2>
            <h3 className="text-xl text-primary font-medium">
              Client Feedbacks
            </h3>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BusinessOverview;
