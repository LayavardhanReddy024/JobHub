import React from "react";
import { Link } from 'react-router-dom';
import './ServiceBanner.css';

const ServiceBanner = () => {
  return (
    <section className="service-banner">
      <div className="service-banner-image">
        <img
          className="service-banner-image-img"
          src="/Services.png"
          alt="Banner"
        />
      </div>
      <div className="service-banner-content">
        <h1 className="service-banner-content-h1">Explore Amazing Opportunities</h1>
        <p className="service-banner-content-p">
          Discover the best opportunities that match your skills and
          preferences. Take the next step in your career journey today.
        </p>
         <Link to="/Login">
             <button className="service-explore-button">
                      Explore
             </button>
        </Link>
      </div>
    </section>
  );
};

export default ServiceBanner;
