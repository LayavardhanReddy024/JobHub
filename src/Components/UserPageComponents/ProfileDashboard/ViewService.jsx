import React from "react";
import ApplicationCard from "./ApplicationCard";
import "./ViewService.css";

const ViewService = () => {

  return (
    <div className="View-Application-Container">
    <div className="view-application-scroll">
    <ApplicationCard 
       image="https://th.bing.com/th/id/OIP.xXVQOUO-MkjSNNvHI0Y4ngHaGC?rs=1&pid=ImgDetMain"
       month="Feb"
       title="Frontend Developer"
       vendor="WebSolutions Ltd."
       description="Build user-friendly interfaces using React.js."
       salary="$75,000/year"
       location="New York, USA"
       time="4hrs"
       status="Rejected" 
       
    />
     <ApplicationCard 
       image="https://th.bing.com/th/id/OIP.xXVQOUO-MkjSNNvHI0Y4ngHaGC?rs=1&pid=ImgDetMain"
       month="Feb"
       title="Frontend Developer"
       vendor="WebSolutions Ltd."
       description="Build user-friendly interfaces using React.js."
       salary="$75,000/year"
       location="New York, USA"
       status="Accepted" 
       time="6hrs"
    />
    

    </div>
  </div>
  );
};

export default ViewService;