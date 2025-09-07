import React, { useState, useEffect } from "react";
import "./ProfileDashboard.css";
import TranslationButton from "../HomePageComponents/TranslateButton";
import Profile from "./ProfileDashboard/Profile";
import EditProfile from "./ProfileDashboard/EditProfile";
import ViewApplication from "./ProfileDashboard/ViewApplication";
import ViewService from "./ProfileDashboard/ViewService";
import ReportIssue from "./ProfileDashboard/ReportIssue";
import AdditionalDetails from "./ProfileDashboard/AdditionalDetails";

const ProfileDashboard = () => {
  const [activeItem, setActiveItem] = useState("profile");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    setActiveItem("profile"); // Default active item
  }, []);

  const setActive = (item) => {
    setActiveItem(item);
    if (window.innerWidth <= 768) {
      setSidebarOpen(false); // Close sidebar in mobile view after selection
    }
  };

  return (
    <>
      <div className="Profile-Dashboard">
        {/* Sidebar Toggle Icon */}
        <div
          className="Profile-Dashboard-menu-icon"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          ☰
        </div>

        {/* Sidebar */}
        <div className={`Profile-Dashboard-sidebar ${sidebarOpen ? "open" : ""}`}>
          <h2>
            <br />
            Welcome to Job Hub
          </h2>
          <hr />
          <h2 style={{ color: "rgb(255, 189, 32)" }}>Profile Dashboard</h2>

          <hr />
          <ul className="Profile-Dashboard-menu">
            {[
              { id: "profile", text: "Profile" },
              { id: "edit-profile", text: "Edit Profile" },
              { id: "add-details", text: "Add Additional Details" },
              { id: "view-applications", text: "View Applications" },
              { id: "view-services", text: "View Services" },
              { id: "report-issue", text: "Report an Issue" },
            ].map((item) => (
              <li
                key={item.id}
                className={activeItem === item.id ? "active" : ""}
                onClick={() => setActive(item.id)}
              >
                {item.text}
              </li>
            ))}
          </ul>
        </div>

        {/* Content area where corresponding section is displayed */}
        <div className="Profile-Dashboard-content">
          {activeItem === "profile" && <Profile />}
          {activeItem === "edit-profile" && <EditProfile />}
          {activeItem === "add-details" && <AdditionalDetails />} {/* Assuming "Add Additional Details" shares same component as EditProfile */}
          {activeItem === "view-applications" && <ViewApplication />}
          {activeItem === "view-services" && <ViewService />}
          {activeItem === "report-issue" && <ReportIssue />} {/* Assuming this component exists */}
        </div>
      </div>

      <TranslationButton />
    </>
  );
};

export default ProfileDashboard;
