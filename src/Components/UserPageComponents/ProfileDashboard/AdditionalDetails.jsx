import React, { useState,useEffect } from 'react';
import './AdditionalDetails.css';
import axios from 'axios';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";


const AdditionalDetails = () => {
    const [user, setUser] = useState(null);

    const [educationText, setEducationText] = useState('');
    const [experienceText, setExperienceText] = useState('');
    const [documentsText, setDocumentsText] = useState('');

    const [isEditing, setIsEditing] = useState({ education: false, experience: false, documents: false });

   useEffect(() => {
        const fetchUserDetails = async () => {
          try {
            const response = await axios.get("http://localhost:8086/user/details", {
              withCredentials: true, // ✅ Ensures cookies are sent
            });
    
            setUser(response.data);
            setEducationText(response.data.education || "");
            setExperienceText(response.data.experience || "");
            setDocumentsText(response.data.additionalDocuments || "");
          } catch (error) {
            console.error("Error fetching user details:", error);
            toast.error("Failed to load user details.");
          }
        };
    
        fetchUserDetails();
      }, []);
      const saveAdditionalDetails = async () => {
        const updatedData = {
          education: (educationText && Array.isArray(educationText)) 
            ? educationText 
            : educationText.toString().split(".").map((s) => s.trim()),
    
          experience: (experienceText && Array.isArray(experienceText)) 
            ? experienceText 
            : experienceText.toString().split(".").map((s) => s.trim()),
    
          additionalDocuments: (documentsText && Array.isArray(documentsText)) 
            ? documentsText 
            : documentsText.toString().split(".").map((s) => s.trim()),
        };
    
        try {
          const response = await axios.put("http://localhost:8086/updateDetails", updatedData, {
            withCredentials: true, // ✅ Send cookies
          });
    
          toast.success("Profile updated successfully!");
          console.log("Updated profile:", response.data);
        } catch (error) {
          console.error("Error updating profile:", error);
          toast.error("Failed to update profile.");
        }
    };
    
      

    const handleEdit = (section) => {
        setIsEditing((prev) => ({ ...prev, [section]: true }));
    };

    const handleSave = (section, text) => {
        if (section === 'education') {
            setEducationText(text);
        } else if (section === 'experience') {
            setExperienceText(text);
        } else if (section === 'documents') {
            setDocumentsText(text);
        }
        setIsEditing((prev) => ({ ...prev, [section]: false }));
    };

      // Format text for proper display
      const formatText = (text) => {
        if (!text) return <p>No details available.</p>;
        if (Array.isArray(text)) {
            return text.map((item, index) => <p key={index}>{item}</p>);
        }
        return text
            .toString()
            .split(".")
            .map((sentence, index) =>
                sentence.trim() ? <p key={index}>{sentence.trim()}.</p> : null
            );
    };


    return (
        <>
        <div className='AdditionalDetails-Container'>
              
            <div className={`AdditionalDetails-section ${isEditing.education ? 'editing' : ''}`}>
                <strong>Add Education Details</strong>
                {!isEditing.education ? (
                    <center>{formatText(educationText)}</center>
                ) : (
                    <center><textarea 
                        className="AdditionalDetails-edit-box" 
                        defaultValue={educationText} 
                        onChange={(e) => setEducationText(e.target.value)}
                    ></textarea></center>
                )}
                <button className="AdditionalDetails-edit-btn" onClick={() => handleEdit('education')}>
                    Edit
                </button>
                {isEditing.education && (
                    <center>
                       <button className="AdditionalDetails-save-btn" onClick={() => {
            handleSave('education', educationText);
            saveAdditionalDetails();
        }}>
                            Save
                        </button>
                    </center>
                )}
            </div>

            <div className={`AdditionalDetails-section ${isEditing.experience ? 'editing' : ''}`}>
                <strong>Add Experience</strong>
                {!isEditing.experience ? (
                    <center>{formatText(experienceText)}</center>
                ) : (
                    <center><textarea 
                        className="AdditionalDetails-edit-box" 
                        defaultValue={experienceText} 
                        onChange={(e) => setExperienceText(e.target.value)}
                    ></textarea></center>
                )}
                <button className="AdditionalDetails-edit-btn" onClick={() =>{
                     handleEdit('experience');
                     saveAdditionalDetails();
                 } }>
                    Edit
                </button>
                {isEditing.experience && (
                    <center>
                        <button className="AdditionalDetails-save-btn" onClick={() => {
                            handleSave('experience', experienceText);
                            saveAdditionalDetails();
                        }}>
                            Save
                        </button>
                    </center>
                )}
            </div>

            <div className={`AdditionalDetails-section ${isEditing.documents ? 'editing' : ''}`}>
                <strong>Add Documents</strong>
                {!isEditing.documents ? (
                    <center>{formatText(documentsText)}</center>
                ) : (
                    <center><textarea 
                        className="AdditionalDetails-edit-box" 
                        defaultValue={documentsText} 
                        onChange={(e) => setDocumentsText(e.target.value)}
                    ></textarea></center>
                )}
                <button className="AdditionalDetails-edit-btn" onClick={() => handleEdit('documents')}>
                    Edit
                </button>
                {isEditing.documents && (
                    <center>
                        <button className="AdditionalDetails-save-btn" onClick={() => {
                            handleSave('documents', documentsText);
                            saveAdditionalDetails();
                         } }>
                            Save
                        </button>
                    </center>
                )}
            </div>
        </div>
        </>
    );
};

export default AdditionalDetails;
