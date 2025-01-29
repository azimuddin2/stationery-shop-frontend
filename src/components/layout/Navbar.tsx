import { useState } from 'react';
import { HiBars3CenterLeft } from 'react-icons/hi2';
import { IoClose } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import '../../styles/Navbar.css';
import CustomLink from '../shared/CustomLink';
import logo from '../../assets/images/dark-logo.png';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { logout, selectCurrentUser } from '../../redux/features/auth/authSlice';

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectCurrentUser);

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
          <Link to="/products">Products</Link>
        </li>
        <li>
          <Link to="/events">About</Link>
        </li>
        <li>
          <Link to="/admin/dashboard">Dashboard</Link>
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
