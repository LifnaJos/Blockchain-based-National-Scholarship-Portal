import React from 'react';
import './Loading.css'; // Import CSS for styling
import logo from "./components/images/ISP_logo.png";

const Loading = () => {
  return (
    <div className="loading-container">
      <img src={logo} alt="Logo" className="logo_start" />
      <div className="loading-spinner"></div>
    </div>
  );
};

export default Loading;
