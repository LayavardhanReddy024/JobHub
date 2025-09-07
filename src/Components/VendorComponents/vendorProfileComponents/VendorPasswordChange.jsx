import React, { useState, useEffect } from "react";
import "./VendorPasswordChange.css";
import axios from "axios"; // ✅ Import axios
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";
const ChangePassword = ({ onClose }) => {
  
const [vendorData, setVendorData] = useState(null);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

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

  if (!vendorData) {
    return <p>Loading...</p>; // Show loading until user data is available
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      toast.success("New password and confirm password do not match!",{autoClose:1000});
      return;
    }

    try {
      const response = await axios.put(
        "http://localhost:8086/recruiter/change-password",
        { oldPassword, newPassword, confirmPassword },
        { withCredentials: true } // ✅ Send cookies
      );

      toast.success("Password changed successfully!", { autoClose: 1000 });
   setTimeout(() => onClose(), 1500);
    } catch (error) {
      console.error("Password update failed:", error.response?.data);
      toast.error(error.response?.data || "Failed to update password", { autoClose: 1000 });
    }
  };


  return (
    <div className="change-password-container">
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
      <h2>Change Password</h2>
      <form onSubmit={handleSubmit}>
        <label>Old Password</label>
        <input
          type="password"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
          required
        />

        <label>New Password</label>
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />

        <label>Confirm Password</label>
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />

        <button type="submit">Update Password</button>
      </form>
      <button className="close-btn" onClick={onClose}>
        ✖
      </button>
    </div>
  );
};

export default ChangePassword;
