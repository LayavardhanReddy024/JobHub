import React from 'react';
import './VendorFooter.css'; // Ensure this file is in the same directory

const VendorFooter = () => {
  return (
    <footer className="Vendor-footer">
      <div className="Vendor-content">
        <div className="Vendor-top">
          <div className="Vendor-logo-details">
            <i className="Vendor-footer-logo">
              <img src="/Logo.png" alt="PageLogo" />
            </i>
            <span className="Vendor-logo_name">JobHub</span>
          </div>
          <div className="Vendor-media-icons">
            <a href="#"><i className="fab fa-facebook-f"></i></a>
            <a href="#"><i className="fab fa-twitter"></i></a>
            <a href="#"><i className="fab fa-instagram"></i></a>
            <a href="#"><i className="fab fa-linkedin-in"></i></a>
            <a href="#"><i className="fab fa-youtube"></i></a>
          </div>
        </div>
        <div className="Vendor-link-boxes">
          <ul className="Vendor-box">
            <li className="Vendor-link_name">Company</li>
            <li><a href="#">Home</a></li>
            <li><a href="#">Contact us</a></li>
            <li><a href="#">About us</a></li>
            <li><a href="#">Get started</a></li>
          </ul>
          <ul className="Vendor-box">
            <li className="Vendor-link_name">Services</li>
            <li><a href="#">Caterings</a></li>
            <li><a href="#">Drivers</a></li>
            <li><a href="#">Pick & Move</a></li>
            <li><a href="#">Cleaners</a></li>
          </ul>
          <ul className="Vendor-box">
            <li className="Vendor-link_name">Account</li>
            <li><a href="#">Profile</a></li>
            <li><a href="#">My account</a></li>
            <li><a href="#">Preferences</a></li>
            <li><a href="#">Purchase</a></li>
          </ul>
        </div>
      </div>
      <div className="Vendor-bottom-details">
        <div className="Vendor-bottom_text">
          <span className="Vendor-copyright_text">
            Copyright © {new Date().getFullYear()} <a href="#">JobHub</a> All rights reserved.
          </span>
          <span className="Vendor-policy_terms">
            <a href="#">Privacy policy</a>
            <a href="#">Terms & conditions</a>
          </span>
        </div>
      </div>
    </footer>
  );
};

export default VendorFooter;
