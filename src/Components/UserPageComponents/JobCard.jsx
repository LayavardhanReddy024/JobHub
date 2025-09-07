import React from "react";
import PropTypes from "prop-types";
import axios from "axios";
import "./JobCard.css";
import { BiColor } from "react-icons/bi";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const JobCard = ({
  jobId,
  jobImage,
  jobTitle,
  companyName,
  jobDescription,
  vacancies,
  salary,
  location,
  experience,
  education,
  jobType,
  postedDate,
  recruiterId,
  rating = 0,
  
  accommodations = [],
  userId, // ✅ Pass user ID as a prop
  onClick,
}) => {
  
  // ✅ Function to apply for a job
  const applyForJob = async (e) => {
    e.stopPropagation(); // Prevents click from triggering card selection

    try {
      const applyDate = new Date().toISOString().split("T")[0]; // Format: YYYY-MM-DD

      // ✅ Send correct JSON data to backend
      const response = await axios.post("http://localhost:8086/jobs/apply", {
        jobId,
        userId, // ✅ Ensure userId is included
        jobTitle,
        applyDate, // ✅ Backend expects this
      },
      {
        withCredentials: true // Ensures cookies are sent with the request
    });

      if (response.status === 200) {
        toast.success("Job Applied Successfully!");
      }
    } catch (error) {
      // ✅ Handle duplicate job application error
      if (error.response && error.response.status === 400) {
        toast.success(error.response.data); // ❗ Display "You have already applied for this job"
      } else {
        alert("Error applying for job. Try again later.");
      }
    }
  };

  // ✅ Function to fetch phone number & open WhatsApp
  const sendMessage = async (e) => {
    e.stopPropagation(); // Prevent click from triggering card selection

    try {
      // ✅ Backend expects "vendorName", not "companyName"
      const response = await axios.post("http://localhost:8086/jobs/getnumber", {
        vendorName: recruiterId, // ✅ Correct field name
      });

      const phoneNumber = response.data.phone || "919866367885"; // ✅ Use "phone" from response

      if (!phoneNumber) {
        alert("Phone number not found!");
        return;
      }

      // ✅ Pre-filled message
      const message = `Hello, I'm interested in the ${jobTitle} job posted by ${companyName}. Can we discuss further?`;

      // ✅ Open WhatsApp
      const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, "_blank"); // Opens in new tab
    } catch (error) {
      console.error("Error fetching phone number:", error);
      alert("Failed to fetch phone number. Try again later.");
    }
  };

  return (
    <div className="JobCard-job-card" onClick={onClick}>

      <div className="JobCard-job-header">
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
        <img src={jobImage} alt="Job" className="JobCard-job-image" />
        <div className="JobCard-job-info">
          <div>
            <h3 className="JobCard-job-title">
              <a href="#">{jobTitle} →</a>
            </h3>
            <p className="JobCard-company-name">{companyName}</p>
          </div>
          <p className="JobCard-job-description">{jobDescription}</p>
          <span className="JobCard-vacancies">{vacancies} Vacancies</span>
        </div>
      </div>

      <div className="JobCard-job-details">
        <span className="JobCard-salary">💰 {salary}</span>
        <div className="JobCard-job-meta">
          <span className="JobCard-location">📍 {location}</span>
          <span className="JobCard-divider">|</span>
          <span className="JobCard-experience">💼 {experience}</span>
          <span className="JobCard-divider">|</span>
          <span className="JobCard-education">📖 {education}</span>
        </div>
        <span className="JobCard-employment-type">⏳ {jobType}</span>
        <p style={{color:"green"}}>📅 Posted: {postedDate || "Not available"}</p>
      </div>

      <div className="JobCard-job-footer">
        <button className="JobCard-apply-button" onClick={applyForJob}>
          Apply
        </button>
        <button className="JobCard-send-button" onClick={sendMessage}>
          Send Message
        </button>
      </div>
    </div>
  );
};

JobCard.propTypes = {
  jobId: PropTypes.number.isRequired,
  jobImage: PropTypes.string.isRequired,
  jobTitle: PropTypes.string.isRequired,
  companyName: PropTypes.string.isRequired,
  jobDescription: PropTypes.string.isRequired,
  vacancies: PropTypes.number.isRequired,
  salary: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  experience: PropTypes.string.isRequired,
  education: PropTypes.string.isRequired,
  jobType: PropTypes.string.isRequired,
  rating: PropTypes.number,
  postedDate: PropTypes.string,
  overview: PropTypes.string,
  description: PropTypes.arrayOf(PropTypes.string),
  userId: PropTypes.number.isRequired, // ✅ User ID required
  onClick: PropTypes.func.isRequired,
};

export default JobCard;