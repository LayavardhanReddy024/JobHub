import React, { useState, useEffect } from "react";
import ServiceCard from "./ServiceCard";
import "./ServicePostings.css";
import axios from "axios";

const ServicePostings = ({fetchedData, setFetchedData}) => {
  const [apiUrl, setApiUrl] = useState("http://localhost:8086/userpage/services"); // Default URL
  

  useEffect(() => {
    const getData = async () => {
      try {
        console.log("Fetching data from:", apiUrl);
        const data = await axios.get(apiUrl);
        console.log("Fetched services Data:", data.data);
        if (data) {
          setFetchedData(data.data); // ✅ Update the list
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    getData();
  }, [apiUrl]); // 🔥 Runs whenever `apiUrl` changes
 
  // Function to apply filters (Updates the API URL)
  

  return (
    <div className="service-postings-container">
      <h2 className="service-postings-title">Service Postings</h2>
      
      {/* Filter Button for Testing (Replace with Your Filters UI) */}
     

      <div className="service-postings-list">
        {fetchedData.length > 0 ? (
          fetchedData.map((service) => (
            <ServiceCard key={service.id} {...service} />
          ))
        ) : (
          <p>Loading services...</p>
        )}
      </div>
    </div>
  );
};

export default ServicePostings;