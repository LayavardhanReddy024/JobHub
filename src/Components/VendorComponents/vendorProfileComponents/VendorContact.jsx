import React, { useState,useEffect } from "react";
import "./VendorContact.css";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";


const VendorContactDetails = () => {
  const [showForm, setShowForm] = useState(false);
  const [contactData, setContactData] = useState({
    mobile: "",
    email: "",
    whatsappNumber: "",
    alternateContact: "",
  });

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
        setContactData({
          mobile: response.data.mobile || "",
          email: response.data.email || "",
          whatsappNumber: response.data.whatsappNumber || "",
          alternateContact: response.data.alternateContact || "",
        });  // ✅ Update state
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchUserDetails();
  }, []);

  if (!contactData.email) {
    return <p>Loading...</p>; // Show loading until data is available
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setContactData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      console.log("Updating Contact Info:", contactData);
  
      await axios.put(
        "http://localhost:8086/recruiter/update", // ✅ Backend update API
        contactData, 
        { withCredentials: true } // ✅ Send cookies
      );
  
      console.log("Update successful. Fetching updated data...");
  
      // ✅ Fetch updated data after updating
      const response = await axios.get("http://localhost:8086/recruiter/details", {
        withCredentials: true,
      });
      toast.success("Contact details updated successfully!", { autoClose: 1000 });
      setTimeout(() => setShowForm(false), 1500);
  
      console.log("Updated User Data:", response.data);
  
      // ✅ Update state with the latest data
      setContactData({
        mobile: response.data.mobile || "",
        email: response.data.email || "",
        whatsappNumber: response.data.whatsappNumber || "",
        alternateContact: response.data.alternateContact || "",
      });
  
    

    } catch (error) {
      console.error("Error updating contact details:", error);
      toast.error("Failed to update contact details.");
    }
  };
  
  return (
    <div className="VendorContact-container">
  

      {!showForm ? (
        <>
          <h2>Contact Details</h2>
          <div className="VendorContact-details">
          <p><strong>Mobile Number:</strong> {contactData.mobile}</p>
            <p><strong>Email:</strong> {contactData.email}</p>
            <p><strong>WhatsApp Number:</strong> {contactData.whatsappNumber}</p>
            <p><strong>Alternate Contact:</strong> {contactData.alternateContact}</p>
          </div>
          <button className="VendorContact-edit-btn" onClick={() => setShowForm(true)}>
            Edit
          </button>
        </>
      ) : (
        <div className="VendorContact-form-container">
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
         
          <h2>Edit Contact Details</h2>
          
          <label>Mobile Number</label>
          <input type="text" name="mobile"  value={contactData.mobile} onChange={handleInputChange} />

          <label>Email</label>
          <input type="email" name="email" value={contactData.email} onChange={handleInputChange} />

          <label>WhatsApp Number</label>
          <input type="text" name="whatsappNumber" value={contactData.whatsappNumber} onChange={handleInputChange} />

          <label>Alternate Contact</label>
          <input type="text" name="alternateContact" value={contactData.alternateContact} onChange={handleInputChange} />

          <div className="VendorContact-buttons">
            <button className="VendorContact-apply-btn" onClick={handleSubmit}>Apply</button>
            <button className="VendorContact-cancel-btn" onClick={() => setShowForm(false)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default VendorContactDetails;
