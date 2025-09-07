import { useState, useEffect } from "react";
import './Vendor.css'; 
import ChangePassword from "../Components/VendorComponents/vendorProfileComponents/VendorPasswordChange";
import AboutUs from '../Components/HomePageComponents/AboutUs';
import FakeJobPostings from '../Components/VendorComponents/FakeJobPostings';
import VendorActionCards from "../Components/VendorComponents/VendorActionCards";
import VendorFooter from "../Components/VendorComponents/VendorFooter";
import TranslationButton from "../Components/HomePageComponents/TranslateButton";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; 
const VendorPage = () => {
  const [menuOpen, setMenuOpen] = useState(false); // Header animation and pop-up script
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const navigate=useNavigate();
   const location = useLocation();
   useEffect(() => {
    if (location.state?.success) {
      toast.success("Registered successfully!");
      
      // ✅ Clear the state to prevent the toast from appearing again
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
      if (location.state?.loginSuccess) {
        toast.success("Login Successful!", { autoClose: 2000 });
    
        // ✅ Remove loginSuccess state after displaying the toast
        navigate(location.pathname, { replace: true, state: {} });
      }
    }, [location, navigate]); // State for modal
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
  const [vendorData, setVendorData] = useState(null); // Initially null

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        console.log("All Cookies:", document.cookie);
        const token = document.cookie
          .split("; ")
          .find((row) => row.startsWith("accessToken="))
          ?.split("=")[1]; // Extract JWT token from cookies


        const response = await axios.get("http://localhost:8086/recruiter/details", {
          withCredentials: true, // ✅ Send cookies
        });

        console.log("User Data:", response.data); // ✅ Log API response
        setVendorData(response.data);  // ✅ Update state
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchUserDetails();
  }, []);
 
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".Vendor-profile-menu")) {
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
      section.scrollIntoView({ behavior: "smooth" });
    }
    setMenuOpen(false); // Close the menu after navigation (optional)
  };
  if (!vendorData) {
    return <p>Loading...</p>; // Show loading until user data is available
  }

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
        <header className="Vendor-header">
          <div className="Vendor-logo">
            <img src="\JobHub Logo.png" alt="Company Logo" />
          </div>
          <nav className="Vendor-nav">
            <ul className="Vendor-nav-items">
              <li>
                <a
                  href="#Post-Jobs"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection("Post-Jobs");
                  }}
                >
                  Post Jobs
                </a>
              </li>
              <li>
                <a
                  href="#AboutUs"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection("AboutUs");
                  }}
                >
                  AboutUs
                </a>
              </li>
              <li className="Vendor-profile-menu">
                <div
                  className="Vendor-profile-icon"
                  onClick={(e) => {
                    e.stopPropagation();
                    setMenuOpen(!menuOpen);
                  }}
                >
                  <img
                    src={vendorData.profilePhoto}
                    alt="Profile"
                  />
                </div>
                <ul
                  className={`Vendor-dropdown-menu ${
                    menuOpen ? "Vendor-show-menu" : ""
                  }`}
                >
                  <li>
                    <a href="/VendorProfile">View Profile</a>
                  </li>
                  <li>
                  <a
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
                  <li>
                    <a href="#" onClick={handleLogout}>Log Out</a>
                  </li>
                </ul>
              </li>
            </ul>
          </nav>
        </header>

        <FakeJobPostings />

        <section id="Post-Jobs">
  {vendorData ? (
    vendorData.verified ? (
      <VendorActionCards />
    ) : (
      <>
      <Carousel
              autoPlay
              infiniteLoop
              showThumbs={false}
              showStatus={false}
              interval={2000}
            >
              <div>
                <img src="/add_job.jpg" alt="add job" style={{ width: "100%", height: "300px", objectFit: "contain" }} ></img>
              </div>
              <div>
               <img src="/add_service.jpg" alt="Verification Step 1" style={{ width: "100%", height: "300px", objectFit: "contain" }}  />
               </div>
               <div>
               <img src="/update_job.jpg" alt="Verification Step 1" style={{ width: "100%", height: "300px", objectFit: "contain" }} />
               </div>
               <div>
               <img src="/update_service.jpg" alt="Verification Step 1" style={{ width: "100%", height: "300px", objectFit: "contain" }} />
               </div>
               <div>
               <img src="/view_applicant.jpg" alt="Verification Step 1" style={{ width: "100%", height: "300px", objectFit: "contain" }} />
               </div>
               <div>
               <img src="/view_report.jpg" alt="Verification Step 1" style={{ width: "100%", height: "300px", objectFit: "contain" }} />
               </div>
               </Carousel>
              
        <h2 className="vend">Your account is not verified.Once Your account is verified Your required features will be enabled</h2>
        </>
    )
  ) : (
    <p>Loading vendor details...</p>
  )}
</section>

        <section id="AboutUs">
          <AboutUs />
        </section>
        
        <VendorFooter />
        <TranslationButton />
      </div>
      {/* Change Password Modal */}
      {showPasswordModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <ChangePassword onClose={() => setShowPasswordModal(false)} />
          </div>
        </div>
      )}
    </>
  );
};

export default VendorPage;
