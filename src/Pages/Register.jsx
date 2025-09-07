import React, { useState, useEffect } from "react";
import "./Register.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useLocation} from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [step, setStep] = useState(1);
 // const [mobile, setMobile] = useState("");
 // const [email,setEmail]=useState("");
  const [otp, setOtp] = useState("");
 // const [userName,setUserName]=useState("");
 const navigate=useNavigate();

  const [timer, setTimer] = useState(30);
  const [isResendVisible, setIsResendVisible] = useState(false);
 // const [userType, setUserType] = useState(""); 

  //const [companyName, setCompanyName] = useState("");
  //const [companyType, setCompanyType] = useState(""); // Track company name for recruiters
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
    userType: "",
    companyName: "",
    companyType: "",
  });
   const location = useLocation();
    useEffect(() => {
      const queryParams = new URLSearchParams(location.search);
      if (queryParams.get("error") === "user_not_found") {
        toast.error("User does not exist! Please sign up.", { autoClose: 2000 });
      }
    }, [location]);
  

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleUserTypeChange = (e) => {
    setFormData({ ...formData, userType: e.target.value, companyName: "", companyType: "" });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }
  
    try {
      let response;
      if (formData.userType === "recruiter") {
        response = await axios.post("http://localhost:8086/check/recruiter", {
          companyName: formData.companyName,
          userName:formData.username,
          email: formData.email,
          mobile: formData.mobile,
        });
      } else {
        response = await axios.post("http://localhost:8086/check/user", {
          username: formData.username,
          email: formData.email,
          mobile: formData.mobile,
        });
      }
  
      toast.success(response.data);
      setStep(2);
    } catch (error) {
      toast.error(error.response?.data || "Error checking details. Try again.");
    }
  };
  
  const ChangeEmail = () => {
    setTimer(30);
    setStep(2);
  }
  const handleVerifyEmail = async (e) => {
    e.preventDefault();
    if (!formData.email.trim()) {
      alert("Email is required");
      return;
    }

    try {
      await axios.post("http://localhost:8086/sendotp", { email: formData.email });
      toast.success("OTP sent successfully!");
      setStep(3);
      setTimer(30);
    } catch (error) {
      toast.error("Error sending OTP:", error);
      alert("Failed to send OTP. Please try again.");
    }
  };
  const handleOtpVerification = async (e) => {
    e.preventDefault();

    if (!otp.trim()) {
      alert("Please enter OTP");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8086/verifyotp", {
        email: formData.email,
        otp: otp,
      });

      toast.success(response.data);

      let registerResponse;

      if (formData.userType === "recruiter") {
        registerResponse = await axios.post("http://localhost:8086/recruiter/register", {
          userName: formData.username,
          email: formData.email,
          password: formData.password,
          companyType:formData.companyType,
          companyName: formData.companyName,
          mobile: formData.mobile,
        },{withCredentials:true});
        navigate("/vendorpage", { state: { success: true } });

      } else {
        registerResponse = await axios.post("http://localhost:8086/user/register", {
          userName: formData.username,
          mobile: formData.mobile,
          email: formData.email,
          password: formData.password,
         
        },  { withCredentials: true });
        navigate("/userpage",{ state: { success: true } });

      }
  
      // ✅ Store JWT Token if using Local Storage
     
  
      // 🔄 Redirect after successful registration
    
     
  
    } catch (error) {
      toast.error("Error during OTP verification or registration:", error);
  
      // 🔥 Handle Different Error Cases
      if (error.response) {
        toast.error(`Error: ${error.response.data.message || "Verification or Registration failed"}`);
      } else if (error.request) {
        toast.error("No response from server. Please try again.");
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    }
  };


  useEffect(() => {
    let countdown;
    if (step === 3 && timer > 0) {
      
      countdown = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer === 1) {
            clearInterval(countdown);
            setIsResendVisible(true); // Show "Resend OTP" when timer ends
          }
          return prevTimer - 1;
        });
      }, 1000);
    }
    return () => clearInterval(countdown);
  }, [step, timer]);

  const handleGoogleSignUp = () => {
    setShowPopup(true);
  };

  const handleOptionClick = (role) => {
    alert(`You selected ${role}`);
    setShowPopup(false);
  };

  const handleResendOtp = async () => {
    try {
      await axios.post("http://localhost:8086/sendotp", { email: formData.email });
      toast.success("OTP has been resent successfully!");
      
      // Restart the timer
      setTimer(30);
      setIsResendVisible(false);
    } catch (error) {
      toast.error("Error resending OTP:", error);
      alert("Failed to resend OTP. Please try again.");
    }
  };
  
  return (
    <div className="registration-container" id="signup">
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
      <div className="logo">
        <img src="/JobHub Logo.png" alt="Company Logo" />
      </div>

      <div className="registration-left">
        {step === 1 && (
          <>
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
            <div className="Register-Role-Selection-Text">
            <p >Role:</p>
                <label>
                <input
                    type="radio"
                    name="userType"
                    value="recruiter"
                    required
                    checked={formData.userType === "recruiter"}
                    onChange={handleUserTypeChange}
                  />{" "}
                  Recruiter
                </label>
                <label>
                <input
                    type="radio"
                    name="userType"
                    value="applicant"
                    required
                    checked={formData.userType === "applicant"}
                    onChange={handleUserTypeChange}
                  />{" "}
                  Applicant
                </label>
              </div>
            <input
                type="text"
                name="username"
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
                required
              />
                 <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
             <input
                type="tel"
                name="mobile"
                placeholder="Mobile Number"
                value={formData.mobile}
                onChange={handleChange}
                required
              />
              {formData.userType === "recruiter" && (
                <>
                  <input
                    type="text"
                    name="companyName"
                    placeholder="Company Name"
                    value={formData.companyName}
                    onChange={handleChange}
                    required
                  />
                  <select
                    name="companyType"
                    value={formData.companyType}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Company Type</option>
                    <option value="IT">IT</option>
                    <option value="Finance">Finance</option>
                    <option value="Healthcare">Healthcare</option>
                    <option value="Education">Education</option>
                    <option value="Construction">Construction</option>
                    <option value="Retail">Retail</option>
                    <option value="Other">Other</option>
                  </select>
                </>
              )}

              <input
                type="password"
                name="password"
                placeholder="Create Password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />

          
              <button type="submit">Register</button>
              <div className="line-text">
                <span>OR</span>
              </div>
              </form>
              <button type="button" className="google-register" onClick={handleGoogleSignUp}>
                Sign up with Google
              </button>
           
          </>
        )}

        {step === 2 && (
          <div className="register-verification-container">
            <h2>Verify Email</h2>
            <form onSubmit={handleVerifyEmail}>
  <input
    required
    type="email"
    name="email"
    value={formData.email}
    placeholder="Enter Email"
    onChange={handleChange}
  />
  <button type="button" onClick={() => setStep(1)} >
      Back to Step 1
    </button>
  <button type="submit">Next</button>
</form>
          </div>
        )}

        {step === 3 && (
          <div className="otp-container">
            <h2>Enter OTP</h2>
            <form onSubmit={handleOtpVerification}>
            <input
              type="text"
              required
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
            {!isResendVisible ? (
              <p className="otp-timer">
                Resend OTP in {Math.floor(timer / 60)}:{(timer % 60).toString().padStart(2, "0")}
              </p>
            ) : (
              <p className="resend-otp" onClick={handleResendOtp}>Resend OTP</p>
            )}
             <button type="button" onClick={ChangeEmail} className="changeNumber">Change Email</button>
            <button type="submit">Register</button>
           </form>
          </div>
        )}
      </div>

      <div className="registration-right">
        <img src="src/assets/Join-us.png" alt="Registration" />
        <p>Join us and explore exciting opportunities tailored to your skills.</p>
      </div>

      {showPopup && (
        <div className="registration-popup-overlay">
          <div className="registration-popup-content">
            <button className="registration-popup-close" onClick={() => setShowPopup(false)}>X</button>
            <div className="registration-popup-left" onClick={() => handleOptionClick("Recruiter")}> 
              <img src="src/assets/recruiter.png" alt="Recruiter" />
              <p>Sign up as a Recruiter</p>
            </div>
            <div className="registration-popup-right" onClick={() => handleOptionClick("Applicant")}> 
              <img src="src/assets/applicant.png" alt="Applicant" />
              <p>Sign up as an Applicant</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Register;
