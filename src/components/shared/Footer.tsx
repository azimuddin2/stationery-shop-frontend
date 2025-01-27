import { FaFacebook, FaFacebookF, FaGithub, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { IoLocationOutline } from "react-icons/io5";
import { MdOutlineMailOutline } from "react-icons/md";
import { TbPhone } from "react-icons/tb";
import { Link } from "react-router-dom";
import '../../styles/Footer.css';

const Footer = () => {
    return (
        <footer className='footer-container'>
            <div className="footer">
                <div className='footer-info'>
                    <span className="footer-title">Office Address</span>
                    <ul>
                        <li className='office-address'>
                            <IoLocationOutline className='address-icon'/>
                            <span>Level-4, 34, Feni Centre, Dhaka</span>
                        </li>
                        <li className='office-address'>
                            <MdOutlineMailOutline className='address-icon'/>
                            <span>mohammadazimuddin274@gmail.com</span>
                        </li>
                        <li className='office-address'>
                            <TbPhone className='address-icon'/>
                            <span>+000-18830-61967</span>
                        </li>
                    </ul>
                </div>

                <div className='footer-info'>
                    <span className="footer-title">Services</span>
                    <ul>
                        <li>Design</li>
                        <li>Responsive</li>
                        <li>Development</li>
                        <li>Marketing</li>
                    </ul>
                </div>

                <div className='footer-info'>
                    <span className="footer-title">Company</span>
                    <ul>
                        <li><Link to={'/'} className="link link-hover">About us</Link> </li>
                        <li> <Link to={'/'} className="link link-hover">Contact</Link> </li>
                        <li> <Link to={'/'} className="link link-hover">Jobs</Link> </li>
                        <li><Link to={'/'} className="link link-hover">Press kit</Link></li>
                    </ul>
                </div>

                <div>
                    <span className="follow-title">Follow Us</span>
                    <div className="social-icon">
                        <FaFacebookF className='icon'/>
                        <FaLinkedinIn className='icon'/>
                        <FaInstagram className='icon'/>
                        <FaGithub className='icon'/>
                    </div>
                </div>
            </div>
            <p className='copy-right'><small>Copyright © 2024 Ema John</small></p>
        </footer>
    );
};

export default Footer;