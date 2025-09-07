import React, { useState } from "react";
import "./TranslateButton.css"; // Make sure to create a corresponding CSS file


const TranslationButton = () => {
  const [isPopupActive, setPopupActive] = useState(false);

  const handleButtonClick = () => {
    setPopupActive((prevState) => !prevState);
  };

  const handleOptionSelect = () => {
    setPopupActive(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      setPopupActive(false);
    }
  };

  React.useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <>
      <button className="translate-btn" onClick={handleButtonClick}>
      <i class="fas fa-language"></i>
      </button>
      <div className="translate-text">Translate</div>

      <div className={`popup ${isPopupActive ? "active" : ""}`} onClick={(e) => e.stopPropagation()}>
        <p>Select a language </p>
        <select id="language-selector" onChange={handleOptionSelect}>
          <option value="english">English</option>
          <option value="telugu">Telugu</option>
          <option value="hindi">Hindi</option>
          <option value="tamil">Tamil</option>
          <option value="malayalam">Malayalam</option>
        </select>
      </div>

      {isPopupActive && (
        <div className="overlay" onClick={() => setPopupActive(false)}></div>
      )}
    </>
  );
};

export default TranslationButton;
