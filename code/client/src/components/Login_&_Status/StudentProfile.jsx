import React from "react";
import "./StudentProfile.css";
import studImg from "../images/studImg.webp";

const StudentProfile = ({ profile, handleAddressChange, handleMobileChange, handleEmailChange, handleSaveChanges }) => {

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
  
    return `${day}-${month}-${year}`;
  };

  return (
    <div className="student-profile">
      <div className="pic-uneditable">
        <div className="pic">
          <img src={studImg} alt="student" className="student-image" />
        </div>
        <div className="uneditable">
          <h2>Name: {profile.name}</h2>
          <p>Date of Birth: {formatDate(profile.dob)}</p>
          <p>Application ID: {profile.appId}</p>
          <p>Aadhaar No: {profile.aadhaar_no}</p>
          <p>Virtual ID: {profile.virtual_id}</p>
          <p>Gender: {profile.gender}</p>
        </div>
      </div>
      <hr />
      <div className="editable">
        <h2>Edit Details</h2>
        <div>
          <label>Address:</label>
          <input
            type="text"
            id="address"
            name="address"
            value={profile.address}
            onChange={handleAddressChange}
          />
        </div>
        <div>
          <label>Mobile Number:</label>
          <input
            type="tel"
            id="mobile_no"
            name="mobile_no"
            value={profile.mobile_no}
            onChange={handleMobileChange}
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={profile.email}
            onChange={handleEmailChange}
          />
        </div>
        <button onClick={handleSaveChanges}>Save</button>
      </div>
    </div>
  );
};

export default StudentProfile;
