import React, { useState } from 'react';
import './Nav.css';
import { useNavigate } from 'react-router-dom';

const Nav = ({user}) => {
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    alert('Logged out successfully!');
    navigate('/login'); 
    location.reload()
  };

  return (
    <nav className="nav-container">
     
      <div className="logo">OLX</div>

      
      <div>
        <select className="dropdown">
          <option>Select State</option>
          <option>Andhra Pradesh</option>
          <option>Assam</option>
          <option>Bihar</option>
          <option>Delhi</option>
          <option>Karnataka</option>
          <option>Maharashtra</option>
        </select>
      </div>

      
      <div className="search-bar">
        <input type="text" placeholder="Find Cars, Mobile Phones and more..." />
      </div>

      
      <div>
        <select className="dropdown">
          <option>English</option>
          <option>हिन्दी (Hindi)</option>
        </select>
      </div>

      
      <div className="profile-container" onClick={() => setShowProfileDropdown(!showProfileDropdown)}>
        <button className="profile-button">
          <div className="profile-icon"></div>
          <span>{user}</span>
        </button>
        {showProfileDropdown && (
          <div className="profile-dropdown">
           
          <a href="/Profile">Profile</a>
          <button onClick={handleLogout}>Logout</button>
        
          </div>
        )}
      </div>

      
      <button className="sell-button">+ SELL</button>
    </nav>
  );
};

export default Nav;