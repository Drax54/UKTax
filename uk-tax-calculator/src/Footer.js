// Footer.js

import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css'; // Import CSS for styling

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Left column: About */}
        <div className="footer-about">
          <h3>About Us</h3>
          <p>
            This is a simple tax calculator app that helps you estimate your take-home income based on your gross salary. It is designed to provide a clear understanding of the tax breakdown for the UK tax system.
          </p>
        </div>
        
        {/* Right column: Menu items */}
        <div className="footer-menu">
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about-us">About Us</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
