import {
  FaFacebookF,
  FaGithub,
  FaInstagram,
  FaLinkedinIn,
} from 'react-icons/fa';
import { IoLocationOutline } from 'react-icons/io5';
import { MdOutlineMailOutline } from 'react-icons/md';
import { TbPhone } from 'react-icons/tb';
import { Link } from 'react-router-dom';
import '../../styles/Footer.css';
import ScrollToTop from 'react-scroll-to-top';

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer lg:max-w-7xl lg:mx-auto px-5">
        <div className="footer-info mb-5">
          <h2 className="font-extrabold text-xl text-white">
            Stationery <span className="text-primary">Shop</span>
          </h2>
          <ul className="mt-2 md:mt-5">
            <li className="office-address">
              <IoLocationOutline className="address-icon" />
              <span>Level-4, 34, Feni Centre, Dhaka</span>
            </li>
            <li className="office-address">
              <MdOutlineMailOutline className="address-icon" />
              <span>mohammadazimuddin274@gmail.com</span>
            </li>
            <li className="office-address">
              <TbPhone className="address-icon" />
              <span>+000-18830-61967</span>
            </li>
          </ul>
        </div>

        <div className="footer-info mb-5">
          <span className="footer-title">Get Help</span>
          <ul className="mt-2 md:mt-5">
            <li>Return Policy</li>
            <li>Shipping Policy</li>
            <li>FAQs</li>
            <li>Privacy Policy</li>
          </ul>
        </div>

        <div className="footer-info mb-5">
          <span className="footer-title">Company</span>
          <ul className="mt-2 md:mt-5">
            <li>
              <Link to={'/'} className="link link-hover">
                About us
              </Link>
            </li>
            <li>
              <Link to={'/'} className="link link-hover">
                Contact
              </Link>
            </li>
            <li>
              <Link to={'/'} className="link link-hover">
                Jobs
              </Link>
            </li>
            <li>
              <Link to={'/'} className="link link-hover">
                Products
              </Link>
            </li>
          </ul>
        </div>

        <div className="mb-5">
          <span className="follow-title">Follow Us</span>
          <div className="socials-icon">
            <Link to={'https://www.facebook.com/au.pranto.5'} target={'_blank'}>
              <FaFacebookF className="social-icon" />
            </Link>
            <Link
              to={'https://www.linkedin.com/in/md-azim-uddin-232284241'}
              target={'_blank'}
            >
              <FaLinkedinIn className="social-icon" />
            </Link>
            <Link
              to={'https://www.upwork.com/freelancers/~0199b09bb254ec0732'}
              target={'_blank'}
            >
              <FaInstagram className="social-icon" />
            </Link>
            <Link to={'https://github.com/azimuddin2'} target={'_blank'}>
              <FaGithub className="social-icon" />
            </Link>
          </div>
        </div>
      </div>
      <div className="lg:max-w-7xl lg:mx-auto">
        <p className="copy-right border-t border-gray-600">
          <small>© 2025 Stationery Shop</small>
        </p>
      </div>
      <ScrollToTop
        smooth
        className="animate-bounce flex justify-center items-center"
        color="#fff"
        width="18"
        height="18"
        top={400}
        style={{
          background: '#3F90FC',
          boxShadow: 'none',
          borderRadius: '5px',
        }}
      />
    </footer>
  );
};

export default Footer;
