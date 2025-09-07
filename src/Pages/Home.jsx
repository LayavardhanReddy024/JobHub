import React, { useState } from 'react';
import './Home.css';
import HeaderBanner from '../Components/HomePageComponents/HeaderBanner';
import JobsBanner from '../Components/HomePageComponents/JobsBanner';
import ServiceBanner from '../Components/HomePageComponents/ServiceBanner';
import AboutUs from '../Components/HomePageComponents/AboutUs';
import ContactUs from '../Components/HomePageComponents/ContactUs';
import Footer from "../Components/HomePageComponents/Footer";
import TranslationButton from '../Components/HomePageComponents/TranslateButton';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Home() {
  // Header state and toggle logic
  const [menuOpen, setMenuOpen] = useState(false);
  const location=useLocation();
  const navigate=useNavigate();
   useEffect(() => {
      if (location.state?.logoutSuccess) {
        toast.success("Logout success", { autoClose: 2000 });
        navigate(location.pathname, { replace: true, state: {} });
      }
    }, [location, navigate]);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
    setMenuOpen(false); // Close the menu after navigation (optional)
  };


  return (
    <>
      <div>
      <ToastContainer 
  position="top-center" 
  autoClose={2000} 
  hideProgressBar={false} 
  newestOnTop={false} 
  closeOnClick 
  rtl={false} 
  pauseOnFocusLoss 
  draggable 
  pauseOnHover 
/>
        {/* HEADER SECTION */}
        <header>
          <div className="company-logo">
            <img src="/JobHub Logo.png" alt="PageLogo" />
          </div>
          <nav className={`navbar ${menuOpen ? 'show-navbar' : ''}`}>
            <ul className="nav-items">
            <li className="nav-item">
              <a href="/Login?role=applicant#login-applicant" className="nav-link">Find Jobs</a>
              </li>
              <li className="nav-item">
              <a href="/Login?role=recruiter#login-recruiter" className="nav-link">Post Jobs</a>
              </li>
              <li className="nav-item">
                <a href="/Login" className="nav-link">Services</a>
              </li>
              <li className="nav-item">
                <a
                  href="#aboutus"
                  className="nav-link"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection('aboutus');
                  }}
                >
                  About Us
                </a>
              </li>
              <li className="nav-item">
                <a
                  href="#contactus"
                  className="nav-link"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection('contactus');
                  }}
                >
                  Contact Us
                </a>
              </li>
              <li className="nav-item">
                <a href="/Login" className="nav-link">SignIn/Up</a>
              </li>
            </ul>
          </nav>
          <div className="menu-toggle">
            <i
              className={`bx bx-menu ${menuOpen ? 'hide-bx' : ''}`}
              onClick={toggleMenu}
              aria-expanded={menuOpen}
              aria-label="Open menu"
            ></i>
            <i
              className={`bx bx-x ${menuOpen ? 'show-bx' : ''}`}
              onClick={toggleMenu}
              aria-expanded={!menuOpen}
              aria-label="Close menu"
            ></i>
          </div>
        </header>

        <HeaderBanner />

        {/* Jobs Banner Section */}
        <JobsBanner />

        {/* Service Banner Section */}
        <ServiceBanner />

        {/* About Us Section */}
        <section id="aboutus">
          <AboutUs />
        </section>

        {/* Contact Us Section */}
        <section id="contactus">
          <ContactUs />
        </section>

        {/* Footer */}
        <Footer />

        {/* Translation Button */}
        <TranslationButton />
      </div>
    </>
  );
}
