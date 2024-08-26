import React from 'react';
import { Link } from 'react-router-dom';
import './Menu.css'; // Import CSS for styling

function Menu() {
  return (
    <header>
      <div className="menu-container">
        <div className="logo">
          {/* Placeholder for the logo */}
          <Link to="/">
            <img src="./tax.png" alt="Logo" />
          </Link>
        </div>
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            {/* <li><Link to="/uk-tax-calculator">UK Tax Calculator</Link></li> */}
            <li><Link to="/about-us">About Us</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Menu;
