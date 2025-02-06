import { IoHomeOutline } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import notFound from '../../assets/images/not-found.gif';
import useTitle from '../../hooks/useTitle';

const NotFound = () => {
  useTitle('404 Page');
  return (
    <div className="text-center my-10 px-5">
      <h1 className="text-4xl text-[#FF4D4F] font-semibold">Sorray</h1>
      <h2 className="text-accent text-xl capitalize mt-1">
        This page not found.
      </h2>
      <img src={notFound} alt="Error404" className="mx-auto" />
      <Link to={'/'}>
        <button className="bg-[#FF4D4F] text-white font-medium flex justify-center items-center mx-auto px-6 py-2 rounded">
          <IoHomeOutline className="text-lg mr-1" />
          <span>Back to Home</span>
        </button>
      </Link>
    </div>
  );
};

export default NotFound;
