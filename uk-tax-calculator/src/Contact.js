import React from 'react';
// import Menu from './Menu'; // Import Menu component for consistency
import './Menu.css';

function Contact() {
  return (
    <div>
      {/* <Menu /> */}
      <div className="container">
        <h1>Contact Us</h1>
        <p>If you have any questions or feedback, feel free to reach out to us!</p>
        <p>Email: support@taxcalculator.com</p>
        <p>Phone: +44 123 456 7890</p>
      </div>
    </div>
  );
}

export default Contact;
