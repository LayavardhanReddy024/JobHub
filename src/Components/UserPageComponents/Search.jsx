import React, { useState } from "react";
import "./Search.css";

const SearchBar = ({setJobData, setFetchedData}) => {
  const [selectedLocation, setSelectedLocation] = useState("");
  const locations = ["Chennai", "Mumbai", "Banglore", "Vizag"];

  const handleSearch = () => {
    if (!selectedLocation) {
      alert("Please select a location.");
      return;
    }

    fetch(`http://localhost:8086/userpage/search?location=${selectedLocation}`) // Replace with your actual API
    .then((response) => response.json())
    .then((data) => {
      console.log("Search results:", data);

      // Update state with API response data
      setJobData(data.jobs || []);         // Update jobs state
      setFetchedData(data.services || []); // Update services state
    })
    .catch((error) => console.error("Error fetching data:", error));
  };

  return (
    <div className="width-100 Search-banner-section">
      <div className="Search-container">
        <h1 className="Search-banner-heading">Find The Best Job For Your Future</h1>
        <p className="Search-banner-para">
          It's a long established fact that a reader will be distracted by the readable
        </p>
        <div className="Search-bar-Container">
          <div className="search-sect">
            <select
              className="search-textbox"
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
            >
              <option value="">Select Location</option>
              {locations.map((location, index) => (
                <option key={index} value={location}>
                  {location}
                </option>
              ))}
            </select>
          </div>
          <div className="search-sect">
            <button className="search-button" onClick={handleSearch}>
              <i className="fa fa-search mr-2" aria-hidden="true"></i> Search Here
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;