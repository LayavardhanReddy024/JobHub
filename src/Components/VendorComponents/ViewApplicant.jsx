import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "./ViewApplicant.css";
import axios from "axios";

const ViewApplicant = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await axios.get("http://localhost:8086/recruiter/applications", {
          withCredentials: true,
        });
        setApplications(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching applications:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  if (loading) return <p>Loading applications...</p>;

  const handleContactClick = (name, contact,jobTitle) => {
    const message = `Hello ${name}, we are happy to forward with your application , ${jobTitle},Thanks!`;
    const encodedMessage = encodeURIComponent(message);
    const phone="91"+contact;
    const whatsappURL = `https://wa.me/${phone}?text=${encodedMessage}`;
    
    window.open(whatsappURL, "_blank");


  };

  return (
    <div className="ViewApplicant-container">
      {applications.length === 0 ? (
        <p>No applications found</p>
      ) : (
        applications.map((app) => (
          
          <div key={app.id} className="ViewApplicant-card">
            <img src={app.profilePhoto || "/default-avatar.png"} alt="Applicant" className="ViewApplicant-img" />
            <div className="ViewApplicant-details">
              <h2 className="ViewApplicant-name">{app.fullName}</h2>
              <div className="ViewApplicant-section">
                <strong>Applied:</strong> <span>{app.jobTitle}</span>
              </div>
              <div className="ViewApplicant-section">
                <strong>Education:</strong> <span>{app.education}</span>
              </div>
              <div className="ViewApplicant-section">
                <strong>Experience:</strong> <span>{app.experience}</span>
              </div>
              <div className="ViewApplicant-section">
                <strong>Contact:</strong> <span>{app.email}</span>
              </div>
              <div className="ViewApplicant-section">
                <strong>Mobile:</strong> <span>{app.mobile}</span>
              </div>
             
            </div>
            <button className="ViewApplicant-btn" onClick={() => handleContactClick(app.fullName, app.mobile,app.jobTitle)}>
              Contact Applicant
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default ViewApplicant;