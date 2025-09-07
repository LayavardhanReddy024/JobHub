import React, { useState } from "react";
import emailjs from "@emailjs/browser";
import "./ReportIssue.css";
import axios from "axios";
import { useEffect } from "react";

const ReportIssue = () => {
  const [username, setUsername] = useState("");
  const [reportType, setReportType] = useState("");
  const [company, setCompany] = useState("");
  const [issue, setIssue] = useState("");
  const [description, setDescription] = useState("");
  const [otherIssue, setOtherIssue] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [companies, setCompanies] = useState([]); 
  useEffect(() => {
    axios
      .get("http://localhost:8086/get/companies/names")
      .then((response) => {
        setCompanies(response.data);
      })
      .catch((error) => {
        console.error("Failed to fetch companies:", error);
      });
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (loading) return;

    setLoading(true);
    setMessage("");

    const templateParams = {
      username,
      reportType: reportType || "N/A",
      company: company || "N/A",
      issue: issue || "N/A",
      description: description || "No description provided.",
      otherIssue: otherIssue || "N/A",
      from_email: username, // Auto-reply to the user
      is_admin: true, // Ensure this flag is included for EmailJS conditionals
    };

    emailjs
      .send(
        "service_pejj7lc",
        "template_jp62zjs",
        templateParams,
        "sVCbEROQoeMSJ_z-U"
      )
      .then(
        (response) => {
          console.log("✅ Report sent to Admin:", response.status, response.text);

          fetch('http://localhost:8086/userpage/issuereport', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              username,
              reportType: reportType || "N/A",
              company: company || null,
              issue: issue || "N/A",
              description: description || "No description provided.",
              otherIssue: otherIssue || "N/A",
            }),
          })
          .then((backendResponse) => backendResponse.json())
          .then((backendData) => {
            console.log("✅ Report saved to the backend:", backendData);
          })
          .catch((backendError) => {
            console.log("❌ Failed to save report to the backend:", backendError);
          });

          emailjs
            .send(
              "service_pejj7lc",
              "template_pnh4vtn",
              templateParams,
              "sVCbEROQoeMSJ_z-U"
            )
            .then(
              (autoReplyResponse) => {
                console.log(
                  "✅ Auto-reply sent:",
                  autoReplyResponse.status,
                  autoReplyResponse.text
                );
                setMessage("Report submitted successfully! Check your email for confirmation.");
              },
              (autoReplyError) => {
                console.log("❌ Auto-reply Failed:", autoReplyError);
                setMessage("Report sent, but auto-reply failed.");
              }
            );
        },
        (error) => {
          console.log("❌ Failed to send report:", error);
          setMessage("Failed to submit report. Try again.");
        }
      )
      .finally(() => {
        setLoading(false);
        setUsername("");
        setReportType("");
        setCompany("");
        setIssue("");
        setDescription("");
        setOtherIssue("");
      });
  };

  return (
    <div className="Report-issue-form-container">
      <center><h2>Report an Issue</h2></center>
      <form onSubmit={handleSubmit}>
        <div className="Report-issue-field">
          <label htmlFor="username">User Email</label>
          <input
            type="email"
            id="username"
            placeholder="Enter your email"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            disabled={loading}
          />
        </div>
        <div className="Report-issue-field">
          <label htmlFor="reportType">Report Type</label>
          <select
            id="reportType"
            value={reportType}
            onChange={(e) => setReportType(e.target.value)}
            disabled={loading}
          >
            <option value="">Select Type</option>
            <option value="error">Report an Error</option>
            <option value="company">Report a Company</option>
          </select>
        </div>

        {reportType === "error" && (
          <div className="Report-issue-field">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              disabled={loading}
            ></textarea>
          </div>
        )}

        {reportType === "company" && (
          <>
            <div className="Report-issue-field">
              <label htmlFor="company">Select Company</label>
              <select
                id="company"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                disabled={loading}
              >
                <option value="">Select Company</option>
                {companies.map((comp, index) => (
                  <option key={index} value={comp}>
                    {comp}
                  </option>
                ))}
              </select>
            </div>
            {company && (
              <div className="Report-issue-field">
                <label htmlFor="issue">Select Issue</label>
                <select
                  id="issue"
                  value={issue}
                  onChange={(e) => setIssue(e.target.value)}
                  disabled={loading}
                >
                  <option value="">Select Issue</option>
                  <option value="Delay in Service">Delay in Service</option>
                  <option value="Overcharging">Overcharging</option>
                  <option value="others">Others</option>
                </select>
              </div>
            )}
            {issue === "others" && (
              <div className="Report-issue-field">
                <label htmlFor="otherIssue">Type of Issue</label>
                <input
                  type="text"
                  id="otherIssue"
                  value={otherIssue}
                  onChange={(e) => setOtherIssue(e.target.value)}
                  disabled={loading}
                />
              </div>
            )}
            {company && (
              <div className="Report-issue-field">
                <label htmlFor="companyDesc">Description</label>
                <textarea
                  id="companyDesc"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  disabled={loading}
                ></textarea>
              </div>
            )}
          </>
        )}

        <button type="submit" className="Report-issue-button" disabled={loading}>
          {loading ? "Submitting..." : "Submit Report"}
        </button>
      </form>
      {message && <p className="status-message">{message}</p>}
    </div>
  );
};

export default ReportIssue;