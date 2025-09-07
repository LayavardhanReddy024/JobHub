import React from "react";
import PropTypes from "prop-types";
import axios from "axios";
import "./FullJobPostingsCard.css";

const FullJobPostingsCard = ({ 
  jobId, jobTitle, companyName, rating = 0, experience, salary, jobType, recruiterId,jobImage,
  location, postedDate, vacancies,  jobDescription , 
  skills = [], accommodations = [], userId // ✅ Added userId as a prop
}) => {
  
  
  // ✅ Function to apply for a job
  const applyForJob = async (e) => {
    e.stopPropagation(); // Prevent accidental click propagation

    try {
      const applyDate = new Date().toISOString().split("T")[0]; // Format: YYYY-MM-DD

      // ✅ Send application request to backend
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
        alert("Job Applied Successfully!");
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        alert(error.response.data); // ❗ Show "You have already applied for this job"
      } else {
        alert("Error applying for job. Try again later.");
      }
    }
  };

  // ✅ Function to fetch phone number & open WhatsApp
  const sendMessage = async (e) => {
    e.stopPropagation(); // Prevent accidental click propagation

    try {
      // ✅ Send request to backend to get phone number
      const response = await axios.post("http://localhost:8086/jobs/getnumber", {
        vendorName: recruiterId, // ✅ Backend expects "vendorName", not "companyName"
      });

      const phoneNumber = response.data.phone || "919866367885"; // ✅ Default fallback number

      if (!phoneNumber) {
        alert("Phone number not found!");
        return;
      }

      // ✅ Pre-filled WhatsApp message
      const message = `Hello, I'm interested in the ${jobTitle} job at ${company}. Can we discuss further?`;

      // ✅ Open WhatsApp
      const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, "_blank"); // Open in a new tab
    } catch (error) {
      console.error("Error fetching phone number:", error);
      alert("Failed to fetch phone number. Try again later.");
    }
  };

  const formatText = (text) => {
    return text ? text.split(".").map((sentence, index) => (
      sentence.trim() && <p key={index}>{sentence.trim()}.</p>
    )) : null;
  };

  return (
    <div className="Full-Job-Postings_card">
      <header className="Full-Job-banner">
        <div className="Full-Job-banner-content">
          <h2>
            Better <span className="Full-Job-highlight">experiences.</span> Made
            possible by <span className="Full-Job-highlight">you.</span>
          </h2>
        </div>
        <div className="Full-Job-banner-image">
          <img
            src={jobImage}
            alt="Job Posting Banner"
          />
        </div>
      </header>

      <main className="Full-Job-job-container">
        <section className="Full-Job-job-details">
          <h2>{jobTitle || "No title available"}</h2>
          <p>
            {companyName || "Unknown Company"} <span className="Full-Job-rating">⭐ {rating}</span>
          </p>
          <p>📅 {experience || "Not specified"} | 💰 {salary || "N/A"}</p>
          <p>🏢 {jobType || "Unknown"} | 📍 {location || "Location not available"}</p>
          <p>Posted: {postedDate || "Unknown"} | Vacancies: {vacancies ?? "Not specified"}</p>
          <div className="Full-Job-buttons">
            <button className="Full-Job-Apply-Button" onClick={applyForJob}>
              Apply
            </button>
            <button className="Full-Job-Send-msg-Button" onClick={sendMessage}>
              Send Message
            </button>
          </div>
        </section>

       

        <section className="Full-Job-job-description">
          <h3>Job Description</h3>
          <p>{jobDescription || "No description available."}</p>
         
        </section>

        <section className="Full-Job-key-skills">
          <h3>Key Skills</h3>
          <p>Skills highlighted with ✨ are preferred key skills</p>
          <div className="Full-Job-skill-tags">
            {skills.length > 0 ? skills.map((skill, index) => (
              <span key={index} className="Full-Job-skill">✨ {skill}</span>
            )) : <p>No skills mentioned.</p>}
          </div>
        </section>

        <section className="Full-Job-Accommodation">
          <h3>Accommodation</h3>
          <ul>
            {accommodations.length > 0 ? (
              accommodations.map((item, index) => (
                <li key={index}>{item}</li>
              ))
            ) : (
              <p>No accommodations listed.</p>
            )}
          </ul>

        </section>

        <section className="Full-Job-beware-imposters">
          <h3>Beware of Imposters</h3>
          <p>
            We never ask for any payment as part of our hiring process. Be cautious
            of fraudulent job offers and report any suspicious activity.
          </p>
          
        </section>
      </main>
    </div>
  );
};

FullJobPostingsCard.propTypes = {
  jobId: PropTypes.number.isRequired,
  jobTitle: PropTypes.string,
  company: PropTypes.string,
  rating: PropTypes.number,
  experience: PropTypes.string,
  salary: PropTypes.string,
  jobType: PropTypes.string,
  location: PropTypes.string,
  postedDate: PropTypes.string,
  vacancies: PropTypes.number,
  overview: PropTypes.string,
  description: PropTypes.string,
  skills: PropTypes.arrayOf(PropTypes.string),
  accommodations: PropTypes.arrayOf(
    PropTypes.shape({
      year: PropTypes.string,
      detail: PropTypes.string,
    })
  ),
  userId: PropTypes.number.isRequired, // ✅ Ensure userId is provided
};

export default FullJobPostingsCard;