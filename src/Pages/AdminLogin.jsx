import React, { useState, useEffect } from "react";
import "./AdminLogin.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const [showOtp, setShowOtp] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [timerRunning, setTimerRunning] = useState(false);
  const [otp, setOtp] = useState("");
  const [formData, setFormData] = useState({
    userName: "",
    password: "",
  });
  const navigate=useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleOtpVerification = async (e) => {
    e.preventDefault();

    if (!otp.trim()) {
      alert("Please enter OTP");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8086/verifyotp", {
        email: "jobhub.ac.in@gmail.com",
        otp: otp,
      });

      alert(response.data);
      navigate("/adminpage");
    } catch (error) {
      console.error("Error during OTP verification", error);
  
      // 🔥 Handle Different Error Cases
      if (error.response) {
        alert(`Error: ${error.response.data.message || "Verification or Registration failed"}`);
      } else if (error.request) {
        alert("No response from server. Please try again.");
      } else {
        alert("Something went wrong. Please try again.");
      }
    }
  };

  useEffect(() => {
    let timer;
    if (timerRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setTimerRunning(false);
    }
    return () => clearInterval(timer);
  }, [timeLeft, timerRunning]);

  const handleVerifyClick = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8086/admin/verify", {
        userName:formData.userName,
        password: formData.password,
      });

      if (response.status === 200) {
        alert("OTP sent to admin email!");
        setShowOtp(true);
        setTimeLeft(30);
        setTimerRunning(true);
      }
    } catch (error) {
      alert(error.response?.data?.message || "Invalid credentials");
    }
  };

  const handleResendOtp = async () => {
    try {
      await axios.post("http://localhost:8086/sendotp", { email: "jobhub.ac.in@gmail.com" });
      alert("OTP has been resent successfully!");
  
      // Restart the timer
      setTimeLeft(30);
      setTimerRunning(true);
    } catch (error) {
      console.error("Error resending OTP:", error);
      alert("Failed to resend OTP. Please try again.");
    }
  };
  

  return (
    <div className="Admin-Login">
      <section>
        {[...Array(200)].map((_, i) => (
          <span key={i}></span>
        ))}
        <div className="signin">
          <div className="content">
            <h2>Sign In</h2>
            <form onSubmit={handleVerifyClick}>
            <div className="form" id="loginForm" style={{ display: showOtp ? "none" : "block" }}>
              <div className="inputBox">
                <input type="text" name="userName"
                  value={formData.userName}
                  onChange={handleChange} required />
                <i>Username</i>
              </div>
              <div className="inputBox">
                <input type="password" name="password"
                  value={formData.password}
                  onChange={handleChange} required />
                <i>Password</i>
              </div>
              <div className="inputBox">
                <button className="verify-button" type="submit">
                  Verify
                </button>
              </div>
            </div>
            </form>
             <form onSubmit={handleOtpVerification}>
            <div className="otp-section" id="otpSection" style={{ display: showOtp ? "block" : "none" }}>
              <div className="inputBox">
                <input type="text" placeholder="Enter OTP"  value={otp}
              onChange={(e) => setOtp(e.target.value)} required />
              </div>
              {timeLeft > 0 ? (
                <div className="timer">Time left: {timeLeft}s</div>
              ) : (
                <div className="resend-text" onClick={handleResendOtp}>
                  Resend OTP
                </div>
              )}
              <button className="login-button" type="submit">Login</button>
            </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AdminLogin;
