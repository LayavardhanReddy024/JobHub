import React, { useState } from "react";
import emailjs from "@emailjs/browser";
import "./ContactUs.css";

const ContactUs = () => {
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (loading) return;
    
    setLoading(true);
    setMessage(""); 

    const templateParams = {
      from_email: email || "N/A",
      description: description || "No message provided",
      username: email || "Anonymous User", // Ensure username exists
      reportType: "N/A", // Prevent missing variables
      company: "N/A",
      issue: "N/A",
      is_admin: "false", // String format for EmailJS
    };

    emailjs
      .send("service_pejj7lc", "template_jp62zjs", templateParams, "sVCbEROQoeMSJ_z-U")
      .then(
        () => {
          return emailjs.send("service_pejj7lc", "template_pnh4vtn", templateParams, "sVCbEROQoeMSJ_z-U");
        }
      )
      .then(
        () => setMessage("Message sent successfully! Check your email."),
        () => setMessage("Message sent, but auto-reply failed.")
      )
      .catch(() => setMessage("Failed to send message. Try again."))
      .finally(() => {
        setLoading(false);
        setEmail("");
        setDescription("");
      });
  };

  return (
    <section className="contact">
      <div className="contact-image">
        <img src="/Contact.png" alt="Contact Us" />
      </div>
      <div className="contact-form">
        <h2>Contact Us</h2>
        <form onSubmit={handleSendMessage}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={loading} // Disable input while sending
          />
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            placeholder="Enter your message"
            rows="5"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            disabled={loading} // Disable textarea while sending
          ></textarea>
          <button type="submit" disabled={loading}>
            {loading ? "Sending..." : "Send Message"} {/* Show loading text */}
          </button>
        </form>
        {message && <p className="status-message">{message}</p>}
      </div>
    </section>
  );
};

export default ContactUs;