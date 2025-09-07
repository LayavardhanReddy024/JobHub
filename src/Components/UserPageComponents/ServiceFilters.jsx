import React, { useState } from 'react';
import './ServiceFilters.css';

const ServiceFilters = ({ setFetchedData }) => {
  const [activeSection, setActiveSection] = useState(null);
  const [selectedFilters, setSelectedFilters] = useState({ serviceType: [], location: [] });
  const [maxPrice, setMaxPrice] = useState(0);

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
    const requestData = {
      serviceTypes: selectedFilters.serviceType,
      locations: selectedFilters.location,
      charges: maxPrice,
    };

    console.log('Sending to backend:', requestData); // Debugging

    try {
      const response = await fetch('http://localhost:8086/userpage/servicefilters', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestData),
        withCredentials: true,
       
      });

      const data = await response.json();
      console.log('Received from backend:', data); // Debugging

      setFetchedData(data); // Pass data to ServicePosting component
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // Clear Filters
  const clearFilters = async () => {
    // Reset filters state
    setSelectedFilters({ serviceType: [], location: [] });
    setMaxPrice(0);
  
    // Request body with empty filters
    const requestData = {
      serviceTypes: [],
      locations: [],
      charges: 0
    };
  
    console.log('Clearing filters and fetching data with:', requestData);
  
    try {
      const response = await fetch('http://localhost:8086/userpage/services', {
        method: 'GET',
        
        withCredentials: true
      });
  
      const data = await response.json();
      console.log('Received cleared filter data:', data);
  
      // Update fetched data
      setFetchedData(data);
    } catch (error) {
      console.error('Error fetching data after clearing filters:', error);
    }
  };
  

  return (
    <div className="servicefilter-container">
      <div className="servicefilter-header">
        <h2>Filter Services</h2>
        <button className="servicefilter-clear-btn" onClick={clearFilters}>Clear All</button>
      </div>

      {/* Service Type Filter */}
      <div className="servicefilter-section">
        <div className="servicefilter-section-title" onClick={() => toggleSection('ServiceType')}>
          Service Type
          <span className={`servicefilter-arrow ${activeSection === 'ServiceType' ? 'up' : ''}`}>▼</span>
        </div>
        {activeSection === 'ServiceType' && (
          <div className="servicefilter-options">
            {["Movers & Packers", "Home Cleaning", "Food Delivery", "Repair Services"].map((type) => (
              <label className="servicefilter-checkbox-label" key={type}>
                <input 
                  type="checkbox" 
                  value={type} 
                  checked={selectedFilters.serviceType.includes(type)} 
                  onChange={(e) => handleCheckboxChange(e, 'serviceType')} 
                /> {type}
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Location Filter */}
      <div className="servicefilter-section">
        <div className="servicefilter-section-title" onClick={() => toggleSection('Location')}>
          Location
          <span className={`servicefilter-arrow ${activeSection === 'Location' ? 'up' : ''}`}>▼</span>
        </div>
        {activeSection === 'Location' && (
          <div className="servicefilter-options">
            {["Bangalore", "Chennai", "Hyderabad", "mumbai", "Coimbatore", "Visakhapatnam", "delhi", "Madurai"]
              .map((city) => (
                <label className="servicefilter-checkbox-label" key={city}>
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

      {/* Price Range Filter */}
      <div className="servicefilter-section">
        <div className="servicefilter-section-title" onClick={() => toggleSection('Charges')}>
          Charges (Max Price: ₹{maxPrice})
          <span className={`servicefilter-arrow ${activeSection === 'Charges' ? 'up' : ''}`}>▼</span>
        </div>
        {activeSection === 'Charges' && (
          <div className="servicefilter-options">
            <input
              type="range"
              min="100"
              max="10000"
              step="50"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
            />
          </div>
        )}
      </div>

      {/* Selected Filters Summary */}
      {(selectedFilters.serviceType.length > 0 || selectedFilters.location.length > 0) && (
        <div className="selected-filters">
          <strong>Selected Filters:</strong> {selectedFilters.serviceType.concat(selectedFilters.location).join(", ")}
        </div>
      )}

      {/* Apply Button */}
      <button className="servicefilter-apply-btn" onClick={handleApplyFilters}>
        Apply
      </button>
    </div>
  );
};

export default ServiceFilters;