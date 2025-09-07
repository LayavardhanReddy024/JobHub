import React, { useState } from "react";
import "./VendorActionCards.css";
import AddJob from "./AddJob";
import UpdateJob from "./UpdateJob";
import AddService from "./AddService";
import UpdateService from "./UpdateService";
import ViewApplicant from "./ViewApplicant";
import VendorReport from "./VendorReport";


const reportData = {
  totalJobs: 25,
  totalServices: 10,
  hiredCandidates: 15,
  totalApplications: 120,
  jobListings: [
    { id: "J101", postedDate: "2025-02-25", title: "Software Engineer", applicants: 20, status: "Open" },
    { id: "J102", postedDate: "2025-02-20", title: "Product Manager", applicants: 12, status: "Closed" },
    { id: "J103", postedDate: "2025-02-18", title: "UI/UX Designer", applicants: 8, status: "Open" },
  ],
};

// Sample data for ViewApplicant
const applicantData = {
  fullName: "John Doe",
  education: "B.Sc. Computer Science",
  experience: "3 years in Web Development",
  contact: "johndoe@example.com",
  mobileNumber: "123456789",
  image: "https://th.bing.com/th/id/OIP.e6z6gpMtWluIwQYPd4xPIAHaKW?rs=1&pid=ImgDetMain",
};


const actions = [
  { 
    
    component: <AddJob /> ,
    
    image: "/add_job.jpg"},

  { 
    component: <UpdateJob />, 
    
    image: "/updatejob.jpg" },

  { 
    component: <ViewApplicant {...applicantData} />, 
    type: "applicants", 
    
    image: "/view_applicant.jpg" },

  { 
    component: <AddService />, 
    
    image: "/add_service.jpg" },

  { 
    component: <UpdateService />, 
    
    image: "/updateservice.jpg" },

  { 
    component:<VendorReport {...reportData} />, 
    type: "reports", 
    
    image: "view_report.jpg"  },
];

const VendorActionCards = () => {
  const [selectedComponent, setSelectedComponent] = useState(null);
  const [modalType, setModalType] = useState(""); // "jobService", "applicants", "reports"

  const handleClick = (action) => {
    if (action.type === "applicants") {
      setModalType("applicants-popup");
    } else if (action.type === "reports") {
      setModalType("reports-popup");
    } else {
      setModalType("job-service-popup");
    }
    setSelectedComponent(action.component);
  };

  const closeModal = () => {
    setSelectedComponent(null);
    setModalType("");
  };

  return (
    <div className="vendor-action-cards">
      <div className="vendor-action-container">
        {actions.map((action, index) => (
          <button 
             key={index} 
             className="vendor-action-card" 
             onClick={() => handleClick(action)}
             style={{ backgroundImage: `url(${action.image})` }}>
            <div className="overlay"></div>
            <div className="content">
            <i className={action.icon}></i>
              <span>{action.label}</span>
            </div>
          </button>
        ))}
      </div>

      {/* Unique Modal for Job & Service Actions */}
      {selectedComponent && modalType === "job-service-popup" && (
        <div className="job-service-popup">
          <div className="job-service-modal">
           
            <button className="job-service-close-btn" onClick={closeModal}>×</button>
            {selectedComponent}
    
          </div>
        </div>
      )}

      {/* Unique Modal for View Applicants */}
      {selectedComponent && modalType === "applicants-popup" && (
        <div className="applicants-popup">
          <div className="applicants-modal">
            <button className="Vendor-Popup-close-btn" onClick={closeModal}>×</button>
            {selectedComponent}
          </div>
        </div>
      )}

      {/* Unique Modal for Reports */}
      {selectedComponent && modalType === "reports-popup" && (
        <div className="reports-popup">
          <div className="reports-modal">
            <button className="Vendor-Popup-close-btn" onClick={closeModal}>×</button>
            {selectedComponent}
          </div>
        </div>
      )}
    </div>
  );
};

export default VendorActionCards;

