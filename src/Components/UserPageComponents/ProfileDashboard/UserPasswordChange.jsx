import React, { useState,useEffect } from "react";
import "./UserPasswordChange.css";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

 // Add styles separately

const UserPasswordChange = ({ onClose }) => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [user,setUser]=useState("");
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        console.log("All Cookies:", document.cookie);
        const token = document.cookie
          .split("; ")
          .find((row) => row.startsWith("accessToken="))
          ?.split("=")[1]; // Extract JWT token from cookies


        const response = await axios.get("http://localhost:8086/user/details", {
          withCredentials: true, // ✅ Send cookies
        });

        console.log("User Data:", response.data); // ✅ Log API response
        setUser(response.data); // ✅ Update state
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchUserDetails();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (newPassword !== confirmPassword) {
      alert("New password and confirm password do not match!");
      return;
    }
  
    try {
      const response = await axios.put("http://localhost:8086/user/change-password", {
        oldPassword,
        newPassword,
        confirmPassword,
      }, {
        withCredentials: true, // ✅ Send cookies
      });
     
  
      toast.success(response.data,{ autoClose: 2000}); // Success message
      onClose(); // Close modal
    } catch (error) {
      console.error("Password update failed:", error.response?.data);
      alert(error.response?.data || "Failed to update password");
    }
  };

  return (
    <div className="UserChange-password-container">
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

export default UserPasswordChange;
