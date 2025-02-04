import { BiSolidPhoneCall } from 'react-icons/bi';
import { HiLocationMarker } from 'react-icons/hi';
import { BsFillClockFill } from 'react-icons/bs';

const OurLocation = () => {
  return (
    <section className="my-12">
      <div className="text-center mb-8 lg:w-2xl mx-auto">
        <h2 className="font-medium text-2xl lg:text-3xl leading-snug text-secondary">
          Our Location
        </h2>
        <p className="text-accent text-sm mt-2">
          Our store is conveniently located in Dhanmondi 17, Dhaka -1200,
          Bangladesh offering easy access to high-quality stationery products
          for all your needs.
        </p>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        <div>
          <div
            className="text-white p-3 rounded-t-sm"
            style={{ backgroundColor: '#3F90FC' }}
          >
            <BiSolidPhoneCall className="text-4xl mx-auto" />
          </div>
          <div className="border border-t-0 border-gray-300">
            <div
              className="text-center m-4 mt-0 pt-5 pb-10 px-5"
              style={{ backgroundColor: '#F3F3F3' }}
            >
              <h3 className="text-secondary text-xl uppercase font-semibold mb-2">
                Phone
              </h3>
              <p className="text-accent text-sm">+88 01883-061967</p>
              <p className="text-accent text-sm">+88 01883-061967</p>
            </div>
          </div>
        </div>

        <div>
          <div
            className="text-white p-3 rounded-t-sm"
            style={{ backgroundColor: '#3F90FC' }}
          >
            <HiLocationMarker className="text-4xl mx-auto" />
          </div>
          <div className="border border-t-0 border-gray-300">
            <div
              className="text-center m-4 mt-0 pt-5 px-5 pb-10"
              style={{ backgroundColor: '#F3F3F3' }}
            >
              <h3 className="text-secondary text-xl uppercase font-semibold mb-2">
                Address
              </h3>
              <p className="text-accent text-sm">
                Dhanmondi 17, Dhaka -1200, <br /> Bangladesh
              </p>
            </div>
          </div>
        </div>

        <div>
          <div
            className="text-white p-4 rounded-t-sm"
            style={{ backgroundColor: '#3F90FC' }}
          >
            <BsFillClockFill className="text-3xl mx-auto" />
          </div>
          <div className="border border-t-0 border-gray-300">
            <div
              className="text-center m-4 mt-0 pt-5 pb-10 px-5"
              style={{ backgroundColor: '#F3F3F3' }}
            >
              <h3 className="text-secondary text-xl uppercase font-semibold mb-2">
                WORKING HOURS
              </h3>
              <p className="text-accent text-sm">Mon - Fri: 08:00 - 22:00</p>
              <p className="text-accent text-sm">Sat - Sun: 10:00 - 23:00</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurLocation;
