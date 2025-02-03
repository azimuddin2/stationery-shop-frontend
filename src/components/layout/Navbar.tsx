import { useState } from 'react';
import { HiBars3CenterLeft } from 'react-icons/hi2';
import { IoClose } from 'react-icons/io5';
import { Link, useNavigate } from 'react-router-dom';
import '../../styles/Navbar.css';
import CustomLink from '../shared/CustomLink';
import logo from '../../assets/images/dark-logo.png';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { logout, selectCurrentUser } from '../../redux/features/auth/authSlice';
import { selectCartItems } from '../../redux/features/cart/cartSlice';
import { FaShoppingCart } from 'react-icons/fa';
import { MdOutlineShoppingCart } from 'react-icons/md';

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectCurrentUser);

  const navigate = useNavigate();
  const cartItems = useAppSelector(selectCartItems);
  const cartCount = cartItems.length;

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <nav className="header lg:max-w-7xl lg:mx-auto px-5">
      <Link to="/">
        <img className="w-full h-10 lg:h-16" src={logo} alt="Logo" />
      </Link>
      <ul id="navbar" className={open ? '#navbar active' : '#navbar'}>
        <li>
          <CustomLink to="/">Home</CustomLink>
        </li>
        <li>
          <CustomLink to="/products">Products</CustomLink>
        </li>
        <li>
          <CustomLink to="/events">About</CustomLink>
        </li>
        <li>
          <Link to="/admin/dashboard">Dashboard</Link>
        </li>
        <li
          className="relative cursor-pointer mr-5"
          onClick={() => navigate('/cart')}
        >
          <MdOutlineShoppingCart size={25} className="text-secondary" />
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-[#3F90FC] text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
              {cartCount}
            </span>
          )}
        </li>
        <li>
          {user?.email ? (
            <button onClick={handleLogout} className="register-btn">
              Logout
            </button>
          ) : (
            <Link to="/login">
              <button className="register-btn">Login</button>
            </Link>
          )}
        </li>
      </ul>
      <div id="mobile" onClick={() => setOpen(!open)}>
        {open ? (
          <IoClose className="nav-icon" />
        ) : (
          <HiBars3CenterLeft className="nav-icon" />
        )}
      </div>
    </nav>
  );
};

export default Navbar;
