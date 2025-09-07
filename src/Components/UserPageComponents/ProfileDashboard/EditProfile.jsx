import React, { useState,useEffect } from 'react';
import axios from 'axios';
import './EditProfile.css';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";


const EditProfile = () => {
  // State for form fields
  const [user, setUser] = useState({});
  const [profilePhoto, setProfilePhoto] = useState("");
  const [selectedFile, setSelectedFile] = useState(null); 
  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        console.log("All Cookies:", document.cookie);
        const token = document.cookie
          .split("; ")
          .find((row) => row.startsWith("token="))
          ?.split("=")[1]; // Extract JWT token from cookies

        const response = await axios.get("http://localhost:8086/user/details", {
          withCredentials: true, // ✅ Send cookies
        });

        console.log("User Data:", response.data);
        console.log("Fetched Profile Picture URL:", response.data.profilePhoto); // ✅ Log API response
        setUser(response.data); // ✅ Update state
        setProfilePhoto(response.data.profilePhoto || "");
        setUsername(response.data.userName || "");
        setFullName(response.data.fullName || "");
        setMobile(response.data.mobile || "");
        setEmail(response.data.email || "");
        setAddress(response.data.address || "");
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchUserDetails();
  }, []);
  

  if (!user) {
    return <p>Loading...</p>; // Show loading until user data is available
  }


  // Handle profile picture change
  const changePhoto = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file); // ✅ Store selected file
      setProfilePhoto(URL.createObjectURL(file)); // ✅ Preview image
    }
  };
  const uploadProfilePicture = async () => {
    if (!selectedFile) return null;

    try {
      const formData = new FormData();
      formData.append("file", selectedFile);

      const response = await axios.post(
        "http://localhost:8086/user/update/profile-picture",
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Uploaded Profile Picture URL:", response.data.profilePictureUrl);

      return response.data.profilePictureUrl; // ✅ Return uploaded image URL
    } catch (error) {
      console.error("Error uploading profile picture:", error);
      toast.error("Failed to upload profile picture.");
      return null;
    }
  };

  // Handle save action
  const saveProfile = async () => {
    try {
      let profilePicUrl = profilePhoto; // Keep the existing profile picture
  
      if (selectedFile) {
        const uploadedUrl = await uploadProfilePicture();
        if (uploadedUrl) {
          profilePicUrl = uploadedUrl; // Update only if upload was successful
        }
      }
  
      const updatedProfile = {
        userName: username,
        fullName,
        mobile,
        email,
        address,
        profilePhoto: profilePicUrl, 
      };
  
      await axios.put("http://localhost:8086/user/update", updatedProfile, {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      });
  
      toast.success("Profile updated successfully!");
      setProfilePhoto(profilePicUrl); // ✅ Update state with the new picture URL
  
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile. Please try again.");
    }
  };
  


  return (
    <div className="Edit-Form-container">
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
      <div id="Edit-Form-container-profile-edit">
        <div className="Edit-Form-container-profile-photo">
        <img src={profilePhoto} alt="Profile Photo" onError={() => console.log("Image failed to load")} />
        
        <input
            type="file"
            id="photo-input"
            style={{ display: "none" }}
            onChange={changePhoto}
            accept="image/*"
          /></div>
        <button onClick={() => document.getElementById('photo-input').click()} className="Profile-Change-Photo">Change Photo</button>

        <div className="Edit-Form-container-form-group">
          <label>Username:</label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>

        <div className="Edit-Form-container-form-group">
          <label>Full Name:</label>
          <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} />
        </div>

        <div className="Edit-Form-container-form-group">
          <label>Phone:</label>
          <input type="text" value={mobile} onChange={(e) => setMobile(e.target.value)} />
        </div>

        <div className="Edit-Form-container-form-group">
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>

        <div className="Edit-Form-container-form-group">
          <label>Address:</label>
          <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
        </div>

        <button className="Edit-Form-container-save-btn" onClick={saveProfile}>Save</button>
      </div>
    </div>
  );
};

export default EditProfile;
