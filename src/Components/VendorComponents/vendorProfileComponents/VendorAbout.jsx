import React, { useState } from "react";
import "./VendorAbout.css";

const VendorAbout = () => {
  const [aboutText, setAboutText] = useState(
    "A shopping mall is a large, modern complex that offers a variety of retail stores, dining options, entertainment facilities, and essential services under one roof. Designed for convenience and enjoyment, malls feature spacious walkways, stylish interiors, and a vibrant atmosphere that attracts shoppers of all ages. They house everything from high-end fashion brands and electronic stores to supermarkets and local boutiques, catering to diverse needs. Many malls also include food courts, cinemas, play areas, and event spaces, making them a popular destination for families and social gatherings. With ample parking and security, shopping malls provide a comfortable and safe shopping experience."
  );
  const [isEditing, setIsEditing] = useState(false);
  const [newText, setNewText] = useState(aboutText);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    setAboutText(newText);
    setIsEditing(false);
  };

  return (
    <div className="vendor-about">
      <div className="about-header">
        <h2>About Us</h2>
        <i className="fas fa-edit edit-icon" onClick={handleEditClick}></i>
      </div>
      <p className="about-text">{aboutText}</p>

      {isEditing && (
        <div className="edit-container">
          <textarea
            value={newText}
            onChange={(e) => setNewText(e.target.value)}
            className="about-input"
          />
          <div className="button-container">
            <button onClick={handleSaveClick} className="save-btn">
              Save
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default VendorAbout;
