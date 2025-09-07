import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios"; // Import axios for API calls
import "./VendorReport.css";

const VendorReport = () => {
  const [jobs, setJobs] = useState([]);
  const [jobToClose, setJobToClose] = useState(null);
  const [jobCount,setJobCount] = useState(null);
  const [serviceCount,setServiceCount] = useState(null);
  const [Candidates,setCandidates] = useState(null);
  const [totalApplications, setTotalApplications] = useState(null);
  // Fetch job data from the backend
  useEffect(() => {
    axios.get("http://localhost:8086/summary",{
      withCredentials: true

    }) // Replace with your actual backend URL
      .then((response) => {
        
        const { jobs } = response.data;
        setJobCount(jobs.length);
        setServiceCount(response.data.serviceCount);
        setCandidates(response.data.candidatesHired);
        setTotalApplications(response.data.noOfApplicants);
        const formattedJobs = jobs.map(job => ({
          id: job.jobId,
          postedDate: job.postedDate,
          title: job.jobTitle,
          applicants: Math.floor(Math.random() * 100), // Simulating applicants count
          status: job.active ? "Open" : "Closed",
          active: job.active
        }));
        setJobs(formattedJobs);
      })
      .catch((error) => {
        console.error("Error fetching jobs:", error);
      });
  }, []);

  // Handle clicking "❌" to close a job
  const handleCloseJob = (jobId) => {
    setJobToClose(jobId);
  };

  // Send update to backend and update state
  const confirmCloseJob = () => {
    if (jobToClose !== null) {
      axios.put(`http://localhost:8086/jobs/${jobToClose}/close`) // Replace with your actual backend URL
        .then(() => {
          setJobs(jobs.map(job =>
            job.id === jobToClose ? { ...job, status: "Closed", active: false } : job
          ));
          setJobToClose(null);
        })
        .catch(error => {
          console.error("Error updating job status:", error);
        });
    }
  };

  return (
    <div className="VendorReport">
      <h1>Recruiter Report Analysis</h1>

      <div className="statistics">
        <div className="stat-card">
          <h2>{jobCount}</h2>
          <p>Total Jobs Posted</p>
        </div>
        <div className="stat-card">
          <h2>{serviceCount}</h2>
          <p>Total Services Posted</p>
        </div>
        <div className="stat-card">
          <h2>{Candidates}</h2>
          <p>Candidates Hired</p>
        </div>
        <div className="stat-card">
          <h2>{totalApplications}</h2>
          <p>Total Applications Received</p>
        </div>
      </div>

      <div className="job-history">
        <h2>Job Listings</h2>
        <table>
          <thead>
            <tr>
              <th>Job ID</th>
              <th>Posted Date</th>
              <th>Job Title</th>
              <th>Applicants</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {jobs.length > 0 ? (
              jobs.map((job) => (
                <tr key={job.id}>
                  <td>{job.id}</td>
                  <td>{job.postedDate}</td>
                  <td>{job.title}</td>
                  <td>{job.applicants}</td>
                  <td>
                    {job.status}{" "}
                    {job.active && (
                      <button className="Job-Confirmation-close-icon" onClick={() => handleCloseJob(job.id)}>❌</button>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="no-jobs">No jobs posted yet.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Close Job Confirmation Popup */}
      {jobToClose !== null && (
        <div className="Close-Job-Confirmation-popup-overlay">
          <div className="Close-Job-Confirmation-popup">
            <p>Are you sure you want to close the job?</p>
            <button className="Close-Job-Confirmation-yes-btn" onClick={confirmCloseJob}>Yes</button>
            <button className="Close-Job-Confirmation-no-btn" onClick={() => setJobToClose(null)}>No</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default VendorReport;