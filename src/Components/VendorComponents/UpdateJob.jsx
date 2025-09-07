import { useState, useEffect } from "react";
import axios from "axios";
import "./UpdateJob.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UpdateJob = () => {
  const recruiterId = 1; // ✅ Replace with dynamic recruiterId when needed

  const [jobs, setJobs] = useState([]); // ✅ Store all jobs locally
  const [selectedJobId, setSelectedJobId] = useState(""); // ✅ Track selected job
  const [originalData, setOriginalData] = useState({}); // ✅ Store original job data
  const [formData, setFormData] = useState({}); // ✅ Store updated fields

  // ✅ Fetch all jobs posted by the recruiter
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get(`http://localhost:8086/jobs/recruiter/${recruiterId}`, { withCredentials: true,});
        console.log("Fetched jobs:", response.data);
        setJobs(response.data || []);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };

    fetchJobs();
  }, []);

  // ✅ Handle job selection from dropdown
  const handleJobSelect = (e) => {
    const jobId = e.target.value;
    setSelectedJobId(jobId);

    if (!jobId) {
      setFormData({});
      setOriginalData({});
      return;
    }

    // ✅ Find selected job
    const selectedJob = jobs.find(job => job.jobId.toString() === jobId);
    if (selectedJob) {
      setOriginalData(selectedJob); // Store original data
      setFormData({}); // Reset formData (only store changed fields)
    }
  };

  // ✅ Handle form input changes (only store changed values)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  // ✅ Submit updated job details
  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ Merge updated fields with original data
    const updatedJob = { ...originalData, ...formData };

    try {
      await axios.put(`http://localhost:8086/updateJob`, updatedJob, {
        headers: { "Content-Type": "application/json" }
      });

      toast.success("Job Updated Successfully!");

      // ✅ Refresh the job list after update
      setJobs(jobs.map(job => (job.jobId.toString() === selectedJobId ? updatedJob : job)));

      // ✅ Reset form and dropdown after update
      setSelectedJobId("");
      setOriginalData({});
      setFormData({});

    } catch (error) {
      console.error("Error updating job:", error);
      alert("Failed to update job.");
    }
  };

  return (
    <div className="UpdateJob">
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
      <div className="UpdateJob-container">
        <h2 className="UpdateJob-heading">Update Job</h2>

        {/* ✅ Job Selection Dropdown */}
        <label className="UpdateJob-label">Select Job to Update</label>
        <select className="UpdateJob-input" onChange={handleJobSelect} value={selectedJobId}>
          <option value="">-- Select a Job --</option>
          {jobs.map((job) => (
            <option key={job.jobId} value={job.jobId}>{job.jobTitle}</option>
          ))}
        </select>

        {selectedJobId && originalData.jobTitle && (
          <form className="UpdateJob-form" onSubmit={handleSubmit}>
            <label className="UpdateJob-label">Job Description</label>
            <textarea
              className="UpdateJob-textarea"
              name="jobDescription"
              value={formData.jobDescription ?? originalData.jobDescription}
              onChange={handleChange}
              required
            ></textarea>

            <label className="UpdateJob-label">Vacancies</label>
            <input
              className="UpdateJob-input"
              type="number"
              name="vacancies"
              value={formData.vacancies ?? originalData.vacancies}
              onChange={handleChange}
              required
            />

            <label className="UpdateJob-label">Salary</label>
            <input
              className="UpdateJob-input"
              type="text"
              name="salary"
              value={formData.salary ?? originalData.salary}
              onChange={handleChange}
              required
            />

            <label className="UpdateJob-label">Location</label>
            <input
              className="UpdateJob-input"
              type="text"
              name="location"
              value={formData.location ?? originalData.location}
              onChange={handleChange}
              required
            />

            <label className="UpdateJob-label">Experience</label>
            <input
              className="UpdateJob-input"
              type="text"
              name="experience"
              value={formData.experience ?? originalData.experience}
              onChange={handleChange}
              required
            />

            <button type="submit" className="UpdateJob-button">Update Job</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default UpdateJob;