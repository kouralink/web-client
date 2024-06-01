import React, { useState } from "react";
import "./Contact.css";
import { Facebook, Instagram, Locate, Mail, Phone, Twitter, } from "lucide-react";


const Contact = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [message, setMessage] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("General Inquiry");

const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    console.log({
      firstName,
      lastName,
      email,
      phoneNumber,
      message,
      selectedSubject,
    });
    setFirstName("");
    setLastName("");
    setEmail("");
    setPhoneNumber("");
    setMessage("");
    setSelectedSubject("General Inquiry");
  };

  return (
  
    <div className="contact-container">
      <div className="contact-info">
        <h2>Contact Information</h2>
        <p>Say something to start a live chat!</p>
        <ul>
            <li>
                <i className="fas fa-phone-alt"></i> <Phone/> +1012 3456 789
            </li>
            <li>
                <i className="fas fa-envelope"></i> <Mail/> demo@gmail.com
            </li>
            <li>
                <i className="fas fa-map-marker-alt"></i><Locate/>  132 Dartmouth Street Boston,
                Massachusetts 02156 United States
            </li>
            <li>
                <i className="fab fa-twitter"></i><Twitter/>
            
            
                <i className="fab fa-instagram"></i> <Instagram/>
           
         
                <i className="fab fa-facebook"></i><Facebook/>
            </li>
        </ul>
        <div className="social-icons">
          <a href="#" className="icon-link">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="#" className="icon-link">
            <i className="fab fa-instagram"></i>
          </a>
          <a href="#" className="icon-link">
            <i className="fab fa-facebook-f"></i>
          </a>
        </div>
      </div>
      <div className="contact-form">
        <h2>Contact Us</h2>
        <p>Any question or remarks? Just write us a message!</p>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              id="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              id="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="phoneNumber">Phone Number</label>
            <input
              type="tel"
              id="phoneNumber"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="subject">Select Subject:</label>
            <div className="subject-options">
              <input
                type="radio"
                id="generalInquiry"
                name="subject"
                value="General Inquiry"
                checked={selectedSubject === "General Inquiry"}
                onChange={() => setSelectedSubject("General Inquiry")}
              />
              <label htmlFor="generalInquiry">General Inquiry</label>
              <input
                type="radio"
                id="otherInquiry"
                name="subject"
                value="Other Inquiry"
                checked={selectedSubject === "Other Inquiry"}
                onChange={() => setSelectedSubject("Other Inquiry")}
              />
              <label htmlFor="otherInquiry">Other Inquiry</label>
            </div>
          </div>
          <button type="submit">Send Message</button>
        </form>
      </div>
    </div>
  );
};

export default Contact;