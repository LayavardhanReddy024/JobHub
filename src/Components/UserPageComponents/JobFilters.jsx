import React, { useState } from 'react';
import './JobFilters.css';

const JobFilters = ({ setJobData }) => {
  const [activeSection, setActiveSection] = useState(null);
  const [selectedFilters, setSelectedFilters] = useState({
    skills: [],
    location: [],
    jobType: [],
    education: [],
    experience: []
  });

  // Toggle Section Visibility
  const toggleSection = (section) => {
    setActiveSection(activeSection === section ? null : section);
  };

  // Handle Checkbox Selection
  const handleCheckboxChange = (event, category) => {
    const { checked, value } = event.target;

    setSelectedFilters((prevFilters) => ({
      ...prevFilters,
      [category]: checked
        ? [...prevFilters[category], value]
        : prevFilters[category].filter((item) => item !== value),
    }));
  };

  // Apply Filters - Fetch Data from Backend
  const handleApplyFilters = async () => {
    console.log('Sending to backend:', selectedFilters);

    try {
      const response = await fetch('http://localhost:8086/userpage/jobfilters', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(selectedFilters),
      });

      const data = await response.json();
      console.log('Received from backend:', data);

      setJobData(data); // Pass data to JobPosting component
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // Clear Filters
  const clearFilters =async () => {
    setSelectedFilters({ skills: [], location: [], jobType: [], education: [], experience: [] });
    try {
      const response = await fetch('http://localhost:8086/userpage/jobs', {
        method: 'GET',
        
        withCredentials: true
      });
  
      const data = await response.json();
      console.log('Received cleared filter data:', data);
  
      // Update fetched data
      setJobData(data);
    } catch (error) {
      console.error('Error fetching data after clearing filters:', error);
    }
  };

  return (
    <div className="job-filter-container">
      <div className="job-filter-header">
        <h2>Filter Jobs</h2>
        <button className="job-filter-clear-btn" onClick={clearFilters}>Clear All</button>
      </div>

      {/* Skills Filter (Checkboxes) */}
      <div className="job-filter-section">
        <div className="job-filter-section-title" onClick={() => toggleSection('skills')}>
          Skills
          <span className={`job-filter-arrow ${activeSection === 'skills' ? 'up' : ''}`}>▼</span>
        </div>
        {activeSection === 'skills' && (
          <div className="job-filter-options">
            {["Editing", "Driving", "Cooking", "Plumbing", "Carpentry"].map((skill) => (
              <label className="job-filter-checkbox-label" key={skill}>
                <input 
                  type="checkbox" 
                  value={skill} 
                  checked={selectedFilters.skills.includes(skill)} 
                  onChange={(e) => handleCheckboxChange(e, 'skills')} 
                /> {skill}
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Location Filter */}
      <div className="job-filter-section">
        <div className="job-filter-section-title" onClick={() => toggleSection('location')}>
          Location
          <span className={`job-filter-arrow ${activeSection === 'location' ? 'up' : ''}`}>▼</span>
        </div>
        {activeSection === 'location' && (
          <div className="job-filter-options">
            {["Bangalore", "Chennai", "Hyderabad", "Kochi", "Mumbai", "Delhi"].map((city) => (
              <label className="job-filter-checkbox-label" key={city}>
                <input 
                  type="checkbox" 
                  value={city} 
                  checked={selectedFilters.location.includes(city)} 
                  onChange={(e) => handleCheckboxChange(e, 'location')} 
                /> {city}
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Job Type Filter */}
      <div className="job-filter-section">
        <div className="job-filter-section-title" onClick={() => toggleSection('jobType')}>
          Job Type
          <span className={`job-filter-arrow ${activeSection === 'jobType' ? 'up' : ''}`}>▼</span>
        </div>
        {activeSection === 'jobType' && (
          <div className="job-filter-options">
            {["Part Time", "Full Time", "Contract Based", "Daily Based"].map((type) => (
              <label className="job-filter-checkbox-label" key={type}>
                <input 
                  type="checkbox" 
                  value={type} 
                  checked={selectedFilters.jobType.includes(type)} 
                  onChange={(e) => handleCheckboxChange(e, 'jobType')} 
                /> {type}
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Education Filter */}
      <div className="job-filter-section">
        <div className="job-filter-section-title" onClick={() => toggleSection('education')}>
          Education
          <span className={`job-filter-arrow ${activeSection === 'education' ? 'up' : ''}`}>▼</span>
        </div>
        {activeSection === 'education' && (
          <div className="job-filter-options">
            {["10th", "12th", "Uneducated", "Diploma", "Degree"].map((edu) => (
              <label className="job-filter-checkbox-label" key={edu}>
                <input 
                  type="checkbox" 
                  value={edu} 
                  checked={selectedFilters.education.includes(edu)} 
                  onChange={(e) => handleCheckboxChange(e, 'education')} 
                /> {edu}
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Experience Filter */}
      <div className="job-filter-section">
        <div className="job-filter-section-title" onClick={() => toggleSection('experience')}>
          Experience
          <span className={`job-filter-arrow ${activeSection === 'experience' ? 'up' : ''}`}>▼</span>
        </div>
        {activeSection === 'experience' && (
          <div className="job-filter-options">
            {["Fresher", "1-3 Years", "3-5 Years", "5+ Years"].map((exp) => (
              <label className="job-filter-checkbox-label" key={exp}>
                <input 
                  type="checkbox" 
                  value={exp} 
                  checked={selectedFilters.experience.includes(exp)} 
                  onChange={(e) => handleCheckboxChange(e, 'experience')} 
                /> {exp}
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Apply Button */}
      <button className="job-filter-apply-btn" onClick={handleApplyFilters}>
        Apply
      </button>
    </div>
  );
};

export default JobFilters;