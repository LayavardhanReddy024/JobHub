import React, { useState, useEffect } from 'react';
import './UserPage.css'; 
import FakeJobsBanner from "../Components/UserPageComponents/FakeJobsBanner"; 
import SearchBar from '../Components/UserPageComponents/Search';
import JobPostings from '../Components/UserPageComponents/JobPostings';
import JobFilters from '../Components/UserPageComponents/JobFilters';
import ServiceFilters from '../Components/UserPageComponents/ServiceFilters';
import ServicePostings from '../Components/UserPageComponents/ServicePostings';
import ContactUs from '../Components/HomePageComponents/ContactUs';
import Footer from "../Components/HomePageComponents/Footer";
import TranslateButton from "../Components/HomePageComponents/TranslateButton";
import UserPasswordChange from '../Components/UserPageComponents/ProfileDashboard/UserPasswordChange';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { useLocation } from 'react-router-dom';

const UserPage = () => {
  const [activeSection, setActiveSection] = useState('jobs'); // Default section: Jobs
  const [menuOpen, setMenuOpen] = useState(false); //Header animation and pop-up script
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [user, setUser] = useState(); // State for modal
  const [fetchedData, setFetchedData] = useState([]);
  const [jobData, setJobData] = useState([]); // ✅ Initialize with an empty array
  const navigate=useNavigate();
  const location = useLocation();
  useEffect(() => {
    if (location.state?.success) {
      toast.success("registered successfully");
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location, navigate]);

  useEffect(() => {
    if (location.state?.otpVerified) {
      toast.success("OTP verified and login successful!", { autoClose: 2000 });
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location, navigate]);
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get("http://localhost:8086/user/details", {
          withCredentials: true,
        });
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };
  
    fetchUserDetails();
  }, [navigate]); // ✅ Runs again when navigation changes
  
 // State for modal
  const handleLogout=async (e)=>
    {
      try {
          const response = await axios.get('http://localhost:8086/logout',  {
            headers: {
              'Content-Type': 'application/json',
            },
            withCredentials: true, // This ensures cookies are sent with the request
          });
    
    if (response.status === 200) {
      localStorage.removeItem("userData");
      console.log("Logout successful");
      // Store the JWT token
      console.log("message",response.data.message);
      // Redirect to the desired page with optional state
      navigate("/", { state: { logoutSuccess: true } }); 
    }
  } catch (error) {
    if (error.response) {
      console.error('Logout failed with status:', error.response.status);
      console.error('Response body:', error.response.data);
      
      setErrorMessage('Logout failed. Please check your credentials.');
    } else {
     
      console.error('Error:', error.message);
    }
  }
  };

  useEffect(() => {
    if (location.state?.loginSuccess) {
      toast.success("Login Successful!", { autoClose: 500 });
  
      // ✅ Remove loginSuccess state after displaying the toast
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location, navigate]);
  
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".UserHeader-profile-menu")) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

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
        <header className="UserHeader-header">
          <div className="UserHeader-logo">
            <img 
              src="\JobHub Logo.png" 
              alt="Company Logo" 
            />
          </div>
          <nav className="UserHeader-nav">
            <ul className="UserHeader-nav-items">
              <li>
                <a
                  href="#Job-Categories"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection('Job-Categories');
                  }}
                >
                  Find Jobs
                </a>
              </li>
              <li>
                <a
                  href="#contactus"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection('contactus');
                  }}
                >
                  Contact Us
                </a>
              </li>
              <li className="UserHeader-profile-menu">
                <div 
                  className="UserHeader-profile-icon" 
                  onClick={(e) => {
                    e.stopPropagation();
                    setMenuOpen(!menuOpen);
                  }}
                >
                  <img 
                   src={user?.profilePhoto} 
                   alt="Profile" 
                   />
                </div>
                <ul className={`UserHeader-dropdown-menu ${menuOpen ? "UserHeader-show-menu" : ""}`}>
                  <li><a href="/ProfileDashboard" >View Profile</a></li>
                  <li><a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      setMenuOpen(false); // Close dropdown menu
                      setShowPasswordModal(true); // Open the modal on click
                    }}
                  >
                    Change Password
                  </a>
                  </li>
                  <li><a href="#" onClick={handleLogout}>Log Out</a></li>
                </ul>
              </li>
            </ul>
          </nav>
        </header>

        
        <FakeJobsBanner />
        <SearchBar setJobData={setJobData} setFetchedData={setFetchedData}/>

        <section id="Job-Categories">
          <div className="Category-container">
            <div
              className={`Category-section ${activeSection === 'jobs' ? 'active' : ''}`}
              onClick={() => setActiveSection('jobs')}
            >
              Jobs
            </div>
            <div
              className={`Category-section ${activeSection === 'services' ? 'active' : ''}`}
              onClick={() => setActiveSection('services')}
            >
              Services
            </div>
          </div>

          <div className="Category-layout-container">
            <div className="Category-filters-container">
            {activeSection === 'jobs' ? <JobFilters setJobData={setJobData}/> : <ServiceFilters setFetchedData={setFetchedData} />}
            </div>
            <div className="Category-postings-container">
            {activeSection === 'jobs' ? <JobPostings jobData={jobData} setJobData={setJobData} /> : <ServicePostings fetchedData={fetchedData} setFetchedData={setFetchedData}/>}
            </div>
          </div>
        </section>

        <section id="contactus">
          <ContactUs />
        </section>

        <Footer />
        <TranslateButton />
      </div>
      {/* Change Password Modal */}
      {showPasswordModal && (
        <div className="Userpage-modal-overlay">
          <div className="Userpage-modal-content">
            <UserPasswordChange onClose={() => setShowPasswordModal(false)}/>
          </div>
        </div>
      )}
    </>
  );
};

export default UserPage;
