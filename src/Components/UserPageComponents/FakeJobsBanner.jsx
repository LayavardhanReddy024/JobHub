import React, { useState } from 'react';
import './FakeJobsBanner.css'; // Make sure to create a separate CSS file for styling

const FakeJobsBanner = () => {
  const [isModalOpen, setIsModalOpen] = useState(false); // State to toggle modal visibility

  const handleModalToggle = () => {
    setIsModalOpen(!isModalOpen); // Toggle modal visibility
  };

  return (
    <section className="FakeJobs-banner">
      <div className="FakeJobs-banner-image">
        <img 
          src="\FakeJobs.png" 
          alt="Banner Image"
        />
      </div>
      <div className="FakeJobs-banner-content">
        <h1>Be aware of Fake Jobs</h1>
        <p>
          "Be cautious of fake job listings that promise unrealistic pay or ask for personal information upfront, as they may be scams designed to exploit job seekers."
        </p>
        <button className="FakeJobs-Report-button" onClick={handleModalToggle}>
          See More
        </button>
      </div>

      {/* Modal Pop-up */}
      {isModalOpen && (
        <div className="FakeJobs-modal">
          <div className="FakeJobs-modal-content">
            <h2>Fake Jobs Information</h2>
            <p>
              Vendors in JobHub will never ask for money or request personal information upfront. 
              Be aware of listings that promise unrealistic pay or require sensitive details before you’ve even had an interview.
            </p>
            <h3>Steps to Report a Problem or Company:</h3>
            <ol>
              <li>Open your profile</li>
              <li>Select "View Profile"</li>
              <li>Once the profile is displayed, the "Report an Issue" option will appear at the bottom.</li>
              <li>Click "Report an Issue".</li>
              <li>You will find the report form on the right side. Fill in the required details.</li>
              <li>Once submitted, JobHub will verify and take appropriate actions.</li>
            </ol>
            <button onClick={handleModalToggle} className="FakeJobs-close-modal">
              Close
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default FakeJobsBanner;

