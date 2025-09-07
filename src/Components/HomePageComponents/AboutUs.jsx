import React from "react";
import "./AboutUs.css"; // Ensure this path points to your CSS file

const AboutUs = () => {
  return (
    <section className="about-us">
      <div className="about-description">
        <h1>About Us</h1>
        <p>
          Welcome to our company! We are dedicated to delivering the best services to our clients. 
          Our mission is to innovate and excel in everything we do. With a team of skilled professionals, 
          we ensure top-notch quality and customer satisfaction. Let's work together to create something amazing!
        </p>
      </div>
      <div className="about-image">
        <img 
          src="/About_us.png" 
          alt="About Us" 
        />
      </div>
    </section>
  );
};

export default AboutUs;
