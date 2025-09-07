import React, { useState } from "react";
import './AdminHome.css'; // Import the CSS file

const AdminHome = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState("");
  const [showAllEvents, setShowAllEvents] = useState(false);
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [aboutText, setAboutText] = useState("Welcome to our company! We are dedicated to delivering the best services to our clients. Our mission is to innovate and excel in everything we do. With a team of skilled professionals, we ensure top-notch quality and customer satisfaction. Let's work together to create something amazing!");
  const [inputValue, setInputValue] = useState(aboutText);

  const [notes, setNotes] = useState([]);
  const [currentNote, setCurrentNote] = useState(null);
  const [showAddPopup, setShowAddPopup] = useState(false);
  const [showViewPopup, setShowViewPopup] = useState(false);
  const [newNote, setNewNote] = useState("");

  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const daysInMonth = getDaysInMonth(currentDate.getFullYear(), currentDate.getMonth());

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const handleDateClick = (day) => {
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    setSelectedDate(date);
  };

  const handleAddEvent = () => {
    if (newEvent && selectedDate) {
      const event = { date: selectedDate.toDateString(), name: newEvent };
      setEvents([...events, event]);
      setNewEvent("");
    }
  };

  const handleRemoveEvent = (index) => {
    setEvents(events.filter((_, i) => i !== index));
  };

  const handleViewAll = () => {
    setShowAllEvents(true);
  };

  const handleClosePopup = () => {
    setShowAllEvents(false);
  };

  const handleEditClick = () => {
    setInputValue(aboutText); // Set input to current text
    setPopupOpen(true);
  };

  const handleAboutClosePopup = () => {
    setPopupOpen(false);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = () => {
    setAboutText(inputValue);
    setPopupOpen(false);
  };
  // Handle adding a new note
  const handleAddNote = () => {
    if (newNote.trim() !== "") {
      const updatedNotes = [newNote, ...notes];
      setNotes(updatedNotes);
      setCurrentNote(newNote);
      setNewNote("");
      setShowAddPopup(false);
    }
  };

  // Handle closing the current note
  const handleCloseNote = () => {
    if (currentNote) {
      setNotes(notes.filter(note => note !== currentNote)); // Remove the current note from the list
      setCurrentNote(null); // Clear the current note display
    }
  };
  
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const sortedEvents = [...events].sort((a, b) => new Date(a.date) - new Date(b.date));

  return (
    <>
    <div>
    <div className="admin-dashboard">
      {/* Profile Card */}
      <div className="admin-profile-card">
  <div className="profile-container">
    <div className="profile-pic">
      <img
        src="https://orig00.deviantart.net/3bdf/f/2016/207/f/4/f46970209960a9206e536223dd7a78db-daak3tg.jpg"
        alt="profile"
      />
    </div>
    <div className="profile-info">
      <div className="profile-name">
        <h2>JobHub</h2>
      </div>
      <div className="profile-details">
        <p><strong>Role:</strong> Admin</p>
        <p><strong>Email:</strong> jobhub.ac.in@gmail.com</p>
        <p><strong>Phone:</strong> +7 (207) 255 48 43</p>
       
      </div>
    </div>
  </div>
</div>

      {/* Calendar */}
      <div className="admin-calendar-card">
        <div className="calendar-header">
          <button onClick={handlePrevMonth}>
            <i className="fas fa-chevron-left"></i>
          </button>
          <h3>{monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}</h3>
          <button onClick={handleNextMonth}>
            <i className="fas fa-chevron-right"></i>
          </button>
        </div>
        <div className="calendar-days">
          {weekDays.map((day) => (
            <div key={day}>{day}</div>
          ))}
        </div>
        <div className="calendar-grid">
          {[...Array(daysInMonth)].map((_, i) => {
            const day = i + 1;
            const isToday = day === new Date().getDate() && currentDate.getMonth() === new Date().getMonth() && currentDate.getFullYear() === new Date().getFullYear();
            const isSelected = selectedDate && day === selectedDate.getDate() && currentDate.getMonth() === selectedDate.getMonth();
            return (
              <div
                key={day}
                onClick={() => handleDateClick(day)}
                className={`day ${isToday ? 'today' : ''} ${isSelected ? 'selected' : ''}`}
              >
                {day}
              </div>
            );
          })}
        </div>
        {selectedDate && (
          <div className="calendar-add-event">
            <input
              type="text"
              value={newEvent}
              onChange={(e) => setNewEvent(e.target.value)}
              placeholder="Add event"
            />
            <button onClick={handleAddEvent}>Add Event</button>
          </div>
        )}
      </div>

      {/* Upcoming Events */}
      <div className="admin-upcoming-events">
        <div className="header">
          <h3>Upcoming Events</h3>
          <button onClick={handleViewAll} className="view-all-btn">View All</button>
        </div>
        <ul>
          {sortedEvents.slice(0, 3).map((event, index) => (
            <li key={index} className="event-card">
              <div className="event-details">
                <h4>{event.name}</h4>
                <p>{event.date}</p>
                <button className="close-btn" onClick={() => handleRemoveEvent(index)}>
                  <i className="fas fa-times"></i>
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {showAllEvents && (
        <div className="Events-popup-overlay">
          <div className="Events-popup">
            <div className="Events-popup-header">
              <h3>All Events</h3>
              <button onClick={handleClosePopup} className="Events-close-popup-btn">
              <i className="fas fa-times"></i>
              </button>
            </div>
            <ul>
              {sortedEvents.map((event, index) => (
                <li key={index} className="Events-popup-event-card">
                  <h4>{event.name}</h4>
                  <p>{event.date}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
    <div className="admin-information">
      {/* About Section */}
      <div className="admin-info-card">
        <h3>About</h3>
        <p>{aboutText}</p>
        <button onClick={handleEditClick} className="edit-btn">
          Edit
        </button>
      </div>

      {/* Another Placeholder Card */}
      <div className="admin-info-card">
      <div className="notes-header">
        <h3>Notes</h3>
        <button className="add-note-btn" onClick={() => setShowAddPopup(true)}>+</button>
      </div>

      {/* Display the latest note */}
      {currentNote && (
        <div className="note-display">
          <p>{currentNote}</p>
          <button className="close-note-btn" onClick={handleCloseNote}>X</button>
        </div>
      )}

      {/* View Notes Button */}
      {notes.length > 0 && (
        <button className="view-notes-btn" onClick={() => setShowViewPopup(true)}>
          View Notes
        </button>
      )}

      {/* Add Note Pop-up */}
      {showAddPopup && (
        <div className="notes-popup-overlay">
          <div className="notes-popup-content">
            <h4>Add Note</h4>
            <textarea
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
              placeholder="Enter your note..."
            />
            <div className="notes-popup-buttons">
              <button onClick={handleAddNote}>Save</button>
              <button onClick={() => setShowAddPopup(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* View Notes Pop-up */}
      {showViewPopup && (
        <div className="notes-popup-overlay">
          <div className="notes-popup-content">
            <h4>All Notes</h4>
            <ul>
              {notes.map((note, index) => (
                <li key={index}>{note}
                 </li>
              ))}
            </ul>
            <button className="View-Notes-close-Button" onClick={() => setShowViewPopup(false)}>Close</button>
          </div>
        </div>
      )}
    </div>

      {/* Pop-up */}
      {isPopupOpen && (
        <div className="about-popup-overlay">
          <div className="about-popup">
          <button onClick={handleAboutClosePopup} className="about-popup-close-btn">
              <i className="fas fa-times"></i>
            </button>
            <h3>Edit About</h3>
            <textarea
              value={aboutText}
              onChange={handleInputChange}
              className="about-input"
            ></textarea>
             <button onClick={handleSubmit} className="about-submit-btn">
              Save
            </button>
          </div>
        </div>
      )}
    </div>
    </div>
    </>
  );
};
export default AdminHome;