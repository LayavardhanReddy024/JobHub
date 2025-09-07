import React from 'react';
import { Link } from 'react-router-dom';
import './JobsBanner.css';

const JobsBanner = () => {
  return (
    <section className="jobs-banner">
      <div className="jobs-banner-content">
        <h1 className="jobs-heading">Find New Job Postings</h1>
        <p className="jobs-paragraph">
          Explore a variety of job opportunities tailored to your skills. Start your career and find the perfect fit for you in near Locations!
        </p>
        <Link to="/Login">
             <button className="jobs-button">Explore</button>
        </Link>
      </div>
      <div className="jobs-banner-image">
        
        <img src="/New_Jobs.png" alt="Banner" className="jobs-img" />
      </div>
    </section>
  );
};

export default JobsBanner;
