import React, { useState } from 'react';
import './HeaderBanner.css';
import { Link } from 'react-router-dom';

const HeaderBanner = () => {

  return (
    <div>
      {/* MAIN CONTENT SECTION */}
      <main>
        <section className="Home_banner">
          <div className="Home_banner-image">
            <img src="/Animated_pic.png" alt="Home_Banner" />
          </div>
          <div className="Home_banner-content">
            <h1>Welcome to JobHub</h1>
            <p>
              Discover amazing features, services, and opportunities. Join us and
              explore the endless possibilities!
            </p>
            <Link to="/Login">
                 <button className="Home_explore-button">Explore</button>
            </Link>
          </div>
        </section>       
      </main>
    </div>
  );
};

export default HeaderBanner;
