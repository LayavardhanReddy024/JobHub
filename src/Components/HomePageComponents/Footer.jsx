import React from 'react';
import './Footer.css'; // Assuming the CSS is extracted into a separate file

const Footer = () => {
  return (
    <footer>
      <div className="content">
        <div className="top">
          <div className="logo-details">
            <i className="footer-logo"><img src="/Logo.png" alt="PageLogo" /></i>
            <span className="logo_name">JobHub</span>
          </div>
          <div className="media-icons">
            <a href="#"><i className="fab fa-facebook-f"></i></a>
            <a href="#"><i className="fab fa-twitter"></i></a>
            <a href="#"><i className="fab fa-instagram"></i></a>
            <a href="#"><i className="fab fa-linkedin-in"></i></a>
            <a href="#"><i className="fab fa-youtube"></i></a>
          </div>
        </div>
        <div className="link-boxes">
          <ul className="box">
            <li className="link_name">Company</li>
            <li><a href="#">Home</a></li>
            <li><a href="#">Contact us</a></li>
            <li><a href="#">About us</a></li>
            <li><a href="#">Get started</a></li>
          </ul>
          <ul className="box">
            <li className="link_name">Services</li>
            <li><a href="#">Caterings</a></li>
            <li><a href="#">Drivers</a></li>
            <li><a href="#">Pick & Move</a></li>
            <li><a href="#">Cleaners</a></li>
          </ul>
          <ul className="box">
            <li className="link_name">Account</li>
            <li><a href="#">Profile</a></li>
            <li><a href="#">My account</a></li>
            <li><a href="#">Prefrences</a></li>
            <li><a href="#">Purchase</a></li>
          </ul>
          <ul className="box">
            <li className="link_name">locations</li>
            <li><a href="#">Hyderabad</a></li>
            <li><a href="#">Chennai</a></li>
            <li><a href="#">Banglore</a></li>
            <li><a href="#">Vizag</a></li>
          </ul>
        </div>
      </div>
      <div className="bottom-details">
        <div className="bottom_text">
          <span className="copyright_text">
          Copyright © {new Date().getFullYear()} <a href="#">JobHub </a>All rights reserved
          </span>
          <span className="policy_terms">
            <a href="#">Privacy policy</a>
            <a href="#">Terms & condition</a>
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
