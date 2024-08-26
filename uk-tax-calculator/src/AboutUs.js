import React from 'react';
// import Menu from './Menu'; // Import Menu component for consistency
import './Menu.css';

function AboutUs() {
  return (
    <div>
      {/* <Menu /> */}
      <div className="container">
        <h1>About Us</h1>
        <p>This is a simple tax calculator app that helps you calculate your take-home salary after taxes and National Insurance contributions.</p>
        <p>We aim to provide accurate and up-to-date tax information to help users understand their income and make informed financial decisions.</p>
      </div>
    </div>
  );
}

export default AboutUs;
