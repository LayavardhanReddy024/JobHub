import React, { useState, useRef,useEffect } from "react";
import "./VendorInfo.css";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";

const VendorInfo = () => {
  const [showForm, setShowForm] = useState(false);
  const [profileImage, setProfileImage] = useState("");
  const fileInputRef = useRef(null);

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

  if (!vendorData) {
    return <p>Loading...</p>; // Show loading until user data is available
  }
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setVendorData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setProfileImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleEditIconClick = () => {
    fileInputRef.current.click();
  };

  const handleSubmit = async () => {
    try {
      console.log("Updating Vendor Info:", vendorData);

      const response = await axios.put(
        "http://localhost:8086/recruiter/update", // ✅ Update recruiter API
        vendorData, 
        { withCredentials: true } // ✅ Send cookies
      );

      console.log("Update Response:", response.data);
      toast.success("Profile updated successfully!",{autoClose:1000}); // ✅ Show success message
      setTimeout(() => setShowForm(false), 1500); // Close form after update
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile.");
    }
  };

  return (
    <div className="Vendorinfo-container">
      
     

      {!showForm ? (
        <>
         <h2>Company Details</h2>
          <div className="Vendorinfo-details">
          <p><strong>Company Name:</strong> {vendorData.companyName}</p>
            <p><strong>Username:</strong> {vendorData.userName}</p>
            <p><strong>Company Type:</strong> {vendorData.companyType}</p>
            <p><strong>Location:</strong> {vendorData.location}</p>
          </div>
          <button className="Vendorinfo-edit-btn" onClick={() => setShowForm(true)}>
            Edit
          </button>
        </>
      ) : (
        <div className="Vendorinfo-form-container">
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
        
          <h2>Edit Vendor Info</h2>
        
          <div className="Vendorinfo-image-upload">
            <label className="Vendorinfo-image-label">
              <img src={profileImage} alt="Profile" />
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                style={{ display: "none" }}
                onChange={handleImageChange}
              />
              <i className="fas fa-edit" onClick={handleEditIconClick}></i>
            </label>
          </div>

          <label>Company Name</label>
          <input type="text" name="companyName" value={vendorData.companyName} onChange={handleInputChange} />


          <label>Username</label>
          <input type="text" name="userName" value={vendorData.userName} onChange={handleInputChange} />

          <label>Company Type</label>
          <input type="text" name="companyType" value={vendorData.companyType} onChange={handleInputChange} />

          <label>Location</label>
          <input type="text" name="Location" value={vendorData.location} onChange={handleInputChange} />

          <div className="Vendorinfo-buttons">
            <button className="Vendorinfo-apply-btn" onClick={handleSubmit}>Apply</button>
            <button className="Vendorinfo-cancel-btn" onClick={() => setShowForm(false)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default VendorInfo;
