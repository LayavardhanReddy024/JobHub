// AdminReports.jsx

import "./AdminReports.css";
import { FaTimes } from "react-icons/fa";
import React, { useState, useEffect } from "react";

const reports = {
  issues: [
    { id: 1, username: "John Doe", issue: "Website not loading properly" },
    { id: 2, username: "Alice Smith", issue: "Unable to login" },
  ],
  companies: [
    {
      id: 1,
      username: "Mark Wilson",
      company: "XYZ Pvt Ltd",
      type: "Fraudulent Activities",
      description: "Fake job postings with no real offers.",
    },
    {
      id: 2,
      username: "Emma Brown",
      company: "ABC Solutions",
      type: "Payment Issues",
      description: "Not paying employees on time.",
    },
    {
      id: 3,
      username: "Mark Wilson",
      company: "XYZ Pvt Ltd",
      type: "Fraudulent Activities",
      description: "Fake job postings with no real offers.",
    },
  ],
};

const AdminReports = () => {
  const [issues, setIssues] = React.useState([]);
  const [companies, setCompanies] = React.useState([]);

  // Fetch issues and company reports when the component mounts
  useEffect(() => {
    const fetchReports = async () => {
      try {
        // Fetching issues data from backend
        const issuesResponse = await fetch('http://localhost:8086/adminpage/getissue');
        const issuesData = await issuesResponse.json();
        setIssues(issuesData);

        // Fetching company reports data from backend
        const companiesResponse = await fetch('http://localhost:8086/adminpage/getreport');
        const companiesData = await companiesResponse.json();
        setCompanies(companiesData);
      } catch (error) {
        console.error("Error fetching reports:", error);
      }
    };

    fetchReports();
  }, []);

  const removeIssue = async (id) => {
    try {
      // Send DELETE request to backend with the id and type in the URL
      const response = await fetch(`http://localhost:8086/adminpage/deleterReport/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        setIssues(issues.filter((report) => report.id !== id));
      } else {
        console.error('Failed to delete the issue');
      }
    } catch (error) {
      console.error('Error deleting issue:', error);
    }
  };
  
  const removeCompany = async (id) => {
    try {
      // Send DELETE request to backend with the id and type in the URL
      const response = await fetch(`http://localhost:8086/adminpage/deleterReport/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        setCompanies(companies.filter((report) => report.id !== id));
      } else {
        console.error('Failed to delete the company report');
      }
    } catch (error) {
      console.error('Error deleting company report:', error);
    }
  };
  

  return (
    <div className="admin-Reports">
    <div className="Admin-Reports-container">
      <div className="Admin-Reports-column">
        <h2>Report an Issue</h2>
        {issues.map(({ id, username, description,createdAt }) => (
          <div key={id} className="Admin-Reports-card">
            <FaTimes className="Admin-Reports-close-btn" onClick={() => removeIssue(id)} />
            <div className="Admin-Reports-card-details">
              <p className="Admin-Reports-username">Username: <strong>{username}</strong></p>
              <p className="Admin-Reports-description"><strong>Description:</strong> {description}</p>
              <p className="Admin-Reports-description"><strong>Reported Time:</strong> {createdAt}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="Admin-Reports-column">
        <h2>Report a Company</h2>
        {companies.map(({ id, username, company, reportType,issue, description,createdAt }) => (
          <div key={id} className="Admin-Reports-card">
            <FaTimes className="Admin-Reports-close-btn" onClick={() => removeCompany(id)} />
            <div className="Admin-Reports-card-details">
              <p className="Admin-Reports-username">Username: <strong>{username}</strong></p>
              <p className="Admin-Reports-company-name"><strong>Company:</strong> {company}</p>
              <p className="Admin-Reports-type"><strong>Report Type:</strong> {reportType}</p>
              <p className="Admin-Reports-type"><strong>Issue:</strong> {issue}</p>
              <p className="Admin-Reports-description"><strong>Description:</strong> {description}</p>
              <p className="Admin-Reports-description"><strong>Reported time:</strong> {createdAt}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
};

export default AdminReports;