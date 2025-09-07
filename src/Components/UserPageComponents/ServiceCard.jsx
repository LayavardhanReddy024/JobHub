import React, { useState } from "react";
import PropTypes from "prop-types";
import axios from "axios"; // Import Axios for API calls
import "./ServiceCard.css";

const ServiceCard = ({
  id,
  image,
  serviceType,
  vendor,
  location,
  charges,
  timing,
  description,
  experience,
  rating,
  servicesCount,
}) => {
  const [loading, setLoading] = useState(false);

  const applyService = async () => {
    try {
      setLoading(true);
      
      // Step 1: Fetch vendor's phone number from the backend
      const response = await axios.post("http://localhost:8086/services/getnumber", {
        serviceId: id,
        vendorName: vendor,
      });

      const phoneNumber = response.data.phone||916304749683; // Backend should return phone number
      
      if (!phoneNumber) {
        alert("Vendor phone number not found!");
        return;
      }

      // Step 2: Pre-fill WhatsApp message
      const message = `Hello ${vendor}, I am interested in your '${serviceType}' service.\n\nDetails:\n📍 Location: ${location}\n💰 Charges: ${charges}\n⏳ Timings: ${timing}\n\nPlease let me know the next steps. Thanks!`;

      // Step 3: Open WhatsApp
      const encodedMessage = encodeURIComponent(message);
      const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
      
      window.open(whatsappURL, "_blank");

    } catch (error) {
      console.error("Error fetching vendor phone number:", error);
      alert("Failed to connect to vendor. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="service-card">
      <div className="service-card-image">
        <img 
          src={image} 
          alt="Service"
          onError={(e) => e.target.src = "https://i.pinimg.com/736x/62/d4/79/62d47950534f8f40eee92dde6f3dfb95.jpg"} 
        />
      </div>
      <div className="service-card-info">
        <h3>Service Type: {serviceType}</h3>
        <p>Vendor: {vendor}</p>
        <p>Location: {location}</p>
        <p>Charges: {charges}</p>
        <p>Timings: {timing}</p>
        <p>Description: {description}</p>
        <p>Experience: {experience}</p>
        <p>Ratings: {rating}</p>
        <p>Services Count: {servicesCount}</p>

        <center>
          <button 
            className="service-card-apply-service" 
            onClick={applyService} 
            disabled={loading}
          >
            {loading ? "Requesting..." : "Apply Service"}
          </button>
        </center>
      </div>
    </div>
  );
};

// PropTypes for validation
ServiceCard.propTypes = {
  id: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  serviceType: PropTypes.string.isRequired,
  vendor: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  charges: PropTypes.string.isRequired,
  timing: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  experience: PropTypes.string.isRequired,
  rating: PropTypes.string.isRequired,
  servicesCount: PropTypes.number.isRequired,
};

export default ServiceCard;