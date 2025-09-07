import React, { useState, useEffect } from "react";
import axios from "axios";
import JobCard from "./JobCard";
import FullJobPostingsCard from "./FullJobPostingsCard";
import "./JobPostings.css";

const JobPostings = ({jobData, setJobData}) => {
  const [selectedJob, setSelectedJob] = useState(null);
  
  const [apiUrl, setApiUrl] = useState("http://localhost:8086/userpage/jobs");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        console.log("Fetching data from:", apiUrl);
        const response = await axios.get(apiUrl);
        console.log("Fetched Job Data:", response.data);

        if (Array.isArray(response.data)) {
          
          setJobData(response.data);
        } else {
          setJobData([]); // ✅ Prevents `.map()` errors
        }

        setError(null);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to fetch job postings. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, [apiUrl]);

  return (
    <div className="job-postings-container">
      <h2 className="job-postings-title">Job Postings</h2>

      {loading && <p>Loading jobs...</p>} {/* ✅ Show a loading message while fetching */}
      {error && <p style={{ color: "red" }}>{error}</p>} {/* ✅ Show an error message */}
      
      {!loading && jobData.length === 0 && <p>No jobs available.</p>} {/* ✅ Handle empty job listings */}

      <div className="Jobs-alignment">
        {jobData.map((job, index) => (
          <JobCard
            key={job.id || index}
            {...job}
            rating={job.rating || 0}
            onClick={() => setSelectedJob(job)}
          />
        ))}
      </div>

      {selectedJob && (
        <div className="Full-job-popup-overlay" onClick={() => setSelectedJob(null)}>
          <div className="Full-job-popup-card" onClick={(e) => e.stopPropagation()}>
            <FullJobPostingsCard {...selectedJob} />
            <button className="Full-job-close-btn" onClick={() => setSelectedJob(null)}>✖</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobPostings;