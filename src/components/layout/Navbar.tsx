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
import { MdOutlineShoppingCart } from 'react-icons/md';
import { AiOutlineLogin, AiOutlineLogout } from 'react-icons/ai';

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
          <CustomLink to="/about-us">About</CustomLink>
        </li>
        {user?.email && (
          <li>
            {user.role === 'admin' ? (
              <Link to="/admin/dashboard">Dashboard</Link>
            ) : (
              <Link to="/user/order-view">Dashboard</Link>
            )}
          </li>
        )}
        {user?.role === 'user' && (
          <li
            className="relative cursor-pointer mr-5 lg:block hidden"
            onClick={() => navigate('/cart')}
          >
            <MdOutlineShoppingCart size={25} className="text-secondary" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-[#FF4D4F] text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </li>
        )}
        <li>
          {user?.email ? (
            <button onClick={handleLogout} className="register-btn">
              <span className="mr-1">Logout</span> <AiOutlineLogout size={20} />
            </button>
          ) : (
            <Link to="/login">
              <button className="register-btn">
                <span className="mr-1">Login</span> <AiOutlineLogin size={20} />
              </button>
            </Link>
          )}
        </li>
      </ul>
      {user?.role === 'user' && (
        <div
          className="relative cursor-pointer lg:hidden mr-[-90px]"
          onClick={() => navigate('/cart')}
        >
          <MdOutlineShoppingCart size={25} className="text-secondary" />
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-[#3F90FC] text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
              {cartCount}
            </span>
          )}
        </div>
      )}
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
