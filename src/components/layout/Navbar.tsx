import { useState } from "react";
import { HiBars3CenterLeft } from "react-icons/hi2";
import { IoClose } from "react-icons/io5";
import { Link } from "react-router-dom";
import '../../styles/Navbar.css';

const Navbar = () => {
    const [open, setOpen] = useState(false);

    return (
        <>
            <nav className='header'>
                <Link to='/'>
                    <h2 className="font-extrabold text-2xl">Stationery <span className=" text-[#3F90FC]">Shop</span></h2>
                </Link>
                <ul id='navbar' className={open ? '#navbar active' : '#navbar'}>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/products">Products</Link>
                    </li>
                    <li>
                        <Link to="/events">About</Link>
                    </li>
                    <li>
                        <Link to="/dashboard">Dashboard</Link>
                    </li>
                    <li>
                        {/* {
                            user?.uid ?
                                (
                                    <button
                                        onClick={handleLogOut}
                                        className='register-btn'
                                    >
                                        SignOut
                                    </button>
                                )
                                :
                                (
                                    <button className='register-btn'>
                                        <Link to="/register">Login</Link>
                                    </button>
                                )
                        } */}
                        <button className='register-btn'>
                            <Link to="/register">Login</Link>
                        </button>
                    </li>
                </ul>
                <div id='mobile' onClick={() => setOpen(!open)}>
                    {
                        open ?
                            <IoClose className="nav-icon" />
                            :
                            <HiBars3CenterLeft className="nav-icon" />
                    }
                </div>
            </nav>
        </>
    );
};

export default Navbar;