import React from "react";
import ApplicationCard from "./ApplicationCard";
import "./ViewApplication.css";
import axios from "axios";
import { useEffect,useState } from "react";

const ViewApplication = () => {
   const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const fetchApplications = async () => {
        try {
          const response = await axios.get("http://localhost:8086/applicant/applications", {
            withCredentials: true,
          });
          setApplications(response.data);
          console.log(response.data);
        } catch (error) {
          console.error("Error fetching applications:", error);
        } finally {
          setLoading(false);
        }
      };
  
      fetchApplications();
    }, []);
  
    if (loading) return <p>Loading applications...</p>;

  return (
    <div className="View-Application-Container">
    <div className="view-application-scroll">
    {applications.map((app, index) => (
          <ApplicationCard
            key={index}
            image={app.profilePhoto || "https://via.placeholder.com/150"}
            month={app.month || "N/A"}
            title={app.jobTitle}
            companyName={app.companyName}
            vendor={app.userName}
            description={app.jobDescription}
            salary={app.salary}
            location={app.location}
            time={app.applyDate}
            status="Accepted"
          />
        ))}

    </div>
  </div>
  );
};

export default ViewApplication;