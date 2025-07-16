import React from "react";
import "./Footer.css";
import AboutUs from '../../Page/AboutUs';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="footer">
            <ul className="footer-link">
                <li><Link to="/about">About Us</Link></li> {/* 👈 ici */}
                <li><a href="#">Contact</a></li>
                <li><a href="#">Privacy Policy</a></li>
                <li><a href="#">Terms of Service</a></li>
            </ul>
        </footer>
    );
};

export default Footer;