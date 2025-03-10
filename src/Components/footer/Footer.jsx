import React from "react";
import "./Footer.css";

const Footer = () => {
    return(
        <footer className="footer">
            <ul className="footer-link">
                <li><a href="#">About Us</a></li>
                <li><a href="#">Contact</a></li>
                <li><a href="#">Privacy Policy</a></li>
                <li><a href="#">Terms of Service</a></li>
            </ul>
        </footer>
    );
};

export default Footer;