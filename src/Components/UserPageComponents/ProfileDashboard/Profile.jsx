import React, { useState, useEffect } from "react";
import "./Profile.css";
import axios from "axios";


const Profile = () => {
  const [user, setUser] = useState({});

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

  if (!user) {
    return <p>Loading...</p>; // Show loading until user data is available
  }
  return (
    <div className="Profile-content">
      <div id="profile" className="Profile-section active">
        <h2>Basic Details</h2>
        <div className="Profile-profile-photo">
          <img src={user?.profilePhoto || "default-profile.png"} alt="Profile Photo" />
        </div>
        <p><strong>UserName:</strong> {user?.userName || ""}</p>
        <p><strong>Full Name:</strong> {user?.fullName || ""}</p>
        <p><strong>Mobile:</strong> {user?.mobile || ""}</p>
        <p><strong>Email:</strong> {user?.email || ""}</p>
        <p><strong>Address:</strong> {user?.address || ""}</p>
      </div>

      {/* ✅ Education Section (Handles Missing Data) */}
      <div className="Profile-section">
        <h2>Education Details</h2>
        {user?.education?.length > 0 ? (
          user.education.map((edu, index) => (
            <p key={index}><strong>{edu}</strong></p>
          ))
        ) : (
          <p>No education details available.</p>
        )}
      </div>

      {/* ✅ Experience Section (Handles Missing Data) */}
      <div className="Profile-section">
        <h2>Experience</h2>
        {user?.experience?.length > 0 ? (
          user.experience.map((exp, index) => (
            <p key={index}><strong>{exp}</strong></p>
          ))
        ) : (
          <p>No experience details available.</p>
        )}
      </div>

      {/* ✅ Additional Documents Section (Handles Missing Data) */}
      <div className="Profile-section">
        <h2>Additional Documents</h2>
        {user?.additionalDocuments?.length > 0 ? (
          user.additionalDocuments.map((doc, index) => (
            <p key={index}><strong>{doc}</strong></p>
          ))
        ) : (
          <p>No additional documents available.</p>
        )}
      </div>
    </div>
  );
};

export default Profile;
