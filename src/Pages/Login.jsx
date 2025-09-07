import { useState, useEffect } from "react";
import "./Login.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useCallback } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [page, setPage] = useState("main");
  const [forgotPassword, setForgotPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const navigate = useNavigate();
  const [popup, setPopup] = useState({ show: false, message: "" });
  const [formData, setFormData] = useState({
    usernameOrEmail: "",
    password: "",
  });
  const [role, setRole] = useState("");
  const location = useLocation();
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const roleParam = queryParams.get("role");
    const hash = window.location.hash.replace("#", "");
  
    if (roleParam) {
      setRole(roleParam); // sets "recruiter" or "applicant"
      if (roleParam === "recruiter") {
        setPage("login-recruiter");
      } else {
        setPage("login-applicant");
      }
    } else if (hash === "login-applicant" || hash === "login-recruiter") {
      setPage(hash);
      setRole(hash === "login-recruiter" ? "recruiter" : "applicant");
    } else {
      setPage("main");
    }
  }, [location.search]);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleGoogleLogin = () => {
    
    // Redirect to Google OAuth2 login endpoint for Google login
    window.location.href = 'http://localhost:8086/oauth2/authorization/google';
  };
  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
  console.log("hello");
      try {
        const loginEndpoint =
          role === "recruiter"
            ? "http://localhost:8086/recruiter/login"
            : "http://localhost:8086/login"; // Different endpoints
  
        const response = await axios.post(
          loginEndpoint,
          {
            identifier: formData.usernameOrEmail,
            password: formData.password,
          },
          { withCredentials: true }
        );
  
        if (response.status === 200) {
          console.log("hi");
          setPopup({ show: true, message: "Login Successful!" });
  
          const userId = response.data.id;
          console.log(userId);
  
          navigate(role === "recruiter" ? "/VendorPage" : "/userpage", {
            state: { loginSuccess: true },
          });
        }
      } catch (error) {
        console.log("error"+error);
        toast.error("Invalid Credentials", { autoClose: 2000 });
      }
    },
    [formData, navigate, role] // Include role in dependencies
  );


  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    if (queryParams.get("error") === "user_not_found") {
      toast.error("User does not exist! Please sign up.", { autoClose: 2000 });
    }
  }, [location]);


  
  useEffect(() => {
    if (otpSent && timer > 0) {
      const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
      return () => clearInterval(interval);
    } else if (timer === 0) {
      setCanResend(true);
    }
  }, [otpSent, timer]);

  const showLogin = (selectedPage) => {
    setPage(selectedPage);
    setForgotPassword(false);
    history.pushState({ page: selectedPage }, "", `#${selectedPage}`);
    setRole(selectedPage === "login-recruiter" ? "recruiter" : "applicant");
  };

  const handleForgetPassword = () => {
    setForgotPassword(true);
    setOtpSent(false);
    setEmail("");
    setOtp("");
    setTimer(30);
    setCanResend(false);
  };

  const handleSendOtp = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8086/forgotpassword/sendotp", { email: email,role:role });
      if (response.status === 200) {
        setOtpSent(true);
        setTimer(30);
        setCanResend(false);
        toast.success("OTP sent successfully!");
      }
    } catch (error) {
      toast.error("Account doesn't exist");
    }
  };
  const verifyOtp = async (e) => {

    e.preventDefault();
    
    try {
      const response = await axios.post("http://localhost:8086/forgotpassword/verifyotp", {
        email: email,
        otp: otp,
        role:role
      },
      {
        withCredentials: true // Ensures cookies are sent with the request
    }
    );
      toast.success("otp verified");
      await navigate(role === "recruiter" ? "/vendorpage" : "/userpage", {
        state: { otpVerified: true }
      });
      toast.success("otp verified");
      setForgotPassword(false);
      
    }

    catch(error)
    {
      toast.error("error in otp verification");

    }
  }

  const handleResendOtp = async () => {
    try {
      await axios.post("http://localhost:8086/forgotpassword/sendotp", { email: email,role:role });
      toast.success("OTP has been resent successfully!");
      setTimer(30);
    setCanResend(false);
    }
    catch (error) {
      console.error("Error resending OTP:", error);
      alert("Failed to resend OTP. Please try again.");
    }
  };
  useEffect(() => {
    const checkHash = () => {
      const hash = window.location.hash.replace("#", "");
      if (hash === "login-applicant" || hash === "login-recruiter") {
        setPage(hash);
      } else {
        setPage("main");
      }
    };

    checkHash();
    window.addEventListener("hashchange", checkHash);
    return () => window.removeEventListener("hashchange", checkHash);
  }, []);

  useEffect(() => {
    const handlePopState = (event) => {
      if (event.state && event.state.page) {
        setPage(event.state.page);
      } else {
        setPage("main");
      }
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const renderForgotPassword = () => (
   
    <div className="Login-Forgot-password-container">
     
      {!otpSent ? (
        <>
         <form onSubmit={handleSendOtp}>
          <h2>Verify Email</h2>
          
          <input
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button className="Login-Next-Button" type="submit">
            Next
          </button>
          </form>
          
        </>
        
      ) :
       (
        <>
        <form onSubmit={verifyOtp}>
          <h2>Enter OTP</h2>
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
          {timer > 0 ? (
            <p className="Login-OTP-Resend">Resend OTP in {timer}s</p>
          ) : (
            <p className="Login-OTP-Resend" onClick={handleResendOtp}>
              Resend
            </p>
          )}
          <button className="Login-Change-Password" onClick={handleForgetPassword}>
            Change Email
          </button>
          <button className="Login-SignIn" type="submit">
            Sign In
          </button>
          </form>
        </>
      )}
    </div>
  );

  return (
    <div className="Login-container">
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
      <div className="Login-logo">
        <img src="\JobHub Logo.png" alt="Company Logo" />
      </div>

      {page === "main" && (
        <>
          <div className="Selection-container">
            <div className="Login-half" onClick={() => showLogin("login-recruiter")}>
              <img src="src\assets\Recruiter.png" alt="Recruiter" />
              <a href="#login-recruiter">Recruiter</a>
            </div>
            <div className="Login-half" onClick={() => showLogin("login-applicant")}>
              <img src="src\assets\Applicant.png" alt="Applicant" />
              <a href="#login-applicant">Applicant</a>
            </div>
          </div>
          <div className="Login-footer">
            Don't have an account? <a href="/Register">Sign up</a>
          </div>
        </>
      )}

      {(page === "login-recruiter" || page === "login-applicant") && (
        <div className="Login-login-container">
          <div className="Login-left-half">
            <img
              src={
                page === "login-recruiter"
                  ? "src\\assets\\Recruiter.png"
                  : "src\\assets\\Applicant.png"
              }
              alt={page === "login-recruiter" ? "Recruiter Profile" : "Applicant Profile"}
            />
            <p>Join us and explore exciting opportunities tailored to your skills.</p>
          </div>
          {!forgotPassword ? (
            <div className="Login-right-half">
              <h2>{page === "login-recruiter" ? "Recruiter Login" : "Applicant Login"}</h2>
              <form onSubmit={handleSubmit}>
                <input
                  className="Login-login-input"
                  type="text"
                  placeholder="Username or Email"
                  name="usernameOrEmail"
                  value={formData.usernameOrEmail}
                  onChange={handleChange}
                  required
                />
                <input
                  className="Login-login-input"
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                <p onClick={handleForgetPassword} className="Login-Forgot-password-text">
                  Forgot Password?
                </p>
                <button type="submit" className="Login-button">
                  Login
                </button>
                <div className="Login-line-text" style={{ background: "hsl(0, 1%, 14%)" }}>
                  <span>OR</span>
                </div>
              </form>
              <button className="Login-google-login" onClick={handleGoogleLogin}>Sign in with Google</button>
              <div className="Login-login-footer">
                Don't have an account? <a href="/Register">Sign up</a>
              </div>
            </div>
          ) : (
            renderForgotPassword()
          )}
        </div>
      )}
    </div>
  );
};

export default Login;