import React, { useState } from "react";
import "./AdminPage.css";
import AdminHome from "../Components/AdminPageComponents/AdminHome";
import AdminInfo from "../Components/AdminPageComponents/AdminInfo";
import AdminVerification from "../Components/AdminPageComponents/AdminVerification";
import AdminReports from "../Components/AdminPageComponents/AdminReports";
import { useNavigate } from "react-router-dom";
const AdminPage = () => {
    const [activeTab, setActiveTab] = useState("home");
    const navigate=useNavigate();

    const menuItems = [
        { id: "home", icon: "fa-house", label: "Home" },
        { id: "info", icon: "fa-circle-info", label: "Info" },
        { id: "verification", icon: "fa-user-check", label: "Verifications" },
        { id: "report", icon: "fa-file-alt", label: "Reports" },
    ];
    const handleLogout = () => {
        // Clear any authentication data (if needed)
        

        // Navigate to the Admin Login page
        navigate("/adminlogin");
    };

    return (
        <div className="admin-page-container">
            {/* Header Section */}
            <div className="admin-page-header">
                <img src="\Logo.png" alt="Logo" className="admin-logo" />
                <h2 className="admin-logo-name">JOBHUB</h2>
                <h2 className="admin-title">ADMIN</h2>
                <i className="fa-solid fa-sign-out-alt admin-logout" onClick={handleLogout}></i>
            </div>

            {/* Main Content */}
            <div className="admin-page-content">
                {activeTab === "home" && <AdminHome />}
                {activeTab === "info" && <AdminInfo />}
               {activeTab === "verification" && <AdminVerification />}
                 {activeTab === "report" && <AdminReports /> } 
            </div>

            {/* Bottom Navigation */}
            <div className="admin-page-bottom-nav">
                {menuItems.map((item) => (
                    <div
                        key={item.id}
                        className={`admin-page-nav-item ${activeTab === item.id ? "active" : ""}`}
                        onClick={() => setActiveTab(item.id)}
                    >
                        <div className={`admin-page-circle ${activeTab === item.id ? "active-icon" : ""}`}>
                        </div>
                        <i className={`fa-solid ${item.icon}`}></i>
                        <div className="admin-page-tooltip">{item.label}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminPage;
