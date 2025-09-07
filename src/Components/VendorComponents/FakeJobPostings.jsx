import React, { useState } from 'react';
import './FakeJobPostings.css'; // Make sure to create a separate CSS file for styling

const FakeJobPostings = () => {
  const [isModalOpen, setIsModalOpen] = useState(false); // State to toggle modal visibility
  const [isAccepted, setIsAccepted] = useState(false); // State to track terms acceptance
  const [isChecked, setIsChecked] = useState(false); // State to track checkbox selection

  const handleModalToggle = () => {
    setIsModalOpen(!isModalOpen); // Toggle modal visibility
  };

  const handleAccept = () => {
    if (isChecked) {
      setIsAccepted(true);
    }
  };

  return (
    <section className="FakeJobPostings-banner">
      <div className="FakeJobPostings-banner-image">
        <img 
          src="/FakeJobs.png" 
          alt="Banner Image"
        />
      </div>
      <div className="FakeJobPostings-banner-content">
        <h1>Avoid Fake Listings</h1>
        <p>
          "Recruiters who post fake job listings risk legal penalties, reputational damage, and loss of trust from job seekers and clients. Such unethical practices can lead to platform bans, lawsuits, and financial liabilities, ultimately harming their credibility and business."
        </p>
        <button className="FakeJobPostings-Report-button" onClick={handleModalToggle}>
            See More
          </button>
      </div>

      {/* Modal Pop-up */}
      {isModalOpen && (
        <div className="FakeJobPostings-modal">
          <div className="FakeJobPostings-modal-content">
            <h2>Terms and Conditions</h2>
            <p>
              JobHub ensures that vendors do not ask for money or personal information upfront. 
              Be cautious of listings that offer unrealistic salaries or require sensitive information before an interview.
            </p>
            <h3>Job Postings</h3>
            <p>
              All job postings on JobHub are verified to the best of our ability, but users should still remain vigilant.
            </p>
            <h3>About Fake Jobs</h3>
            <p>
              Fake job postings often request payment for job placements or personal details before the hiring process.
            </p>
            <h3>Actions Taken Against Fake Job Postings</h3>
            <p>
              If a job is found to be fraudulent, JobHub will take immediate action by removing the listing and banning the vendor.
            </p>
            {!isAccepted ? (
              <div className="FakeJobPostings-terms">
                <div className="FakeJobPostings-terms-column">
                  <input type="checkbox" id="acceptTerms" checked={isChecked} onChange={(e) => setIsChecked(e.target.checked)} />
                  <label htmlFor="acceptTerms">I accept the terms and conditions</label>
                  {isChecked && (
                    <center><button onClick={handleAccept} className="FakeJobPostings-accept-button">
                      Apply
                    </button></center>
                  )}
                </div>
              </div>
            ) : (
              <p className="FakeJobPostings-accepted-text">You have already accepted the terms and conditions.</p>
            )}
            <button onClick={handleModalToggle} className="FakeJobPostings-close-modal">
              Close
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default FakeJobPostings;