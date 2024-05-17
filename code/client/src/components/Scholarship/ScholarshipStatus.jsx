import React, { useEffect, useState } from 'react';
import "./ScholarshipStatus.css";
import ProgressBar from "./ProgressBar";
import { useParams } from 'react-router-dom';
import axios from 'axios';

const calculateProgress = (scheme) => {
  if (scheme.disbursed) {
    return 3; // Funds Disbursed
  } else if (scheme.approved) {
    return 2; // Approved
  } else if (scheme.applied) {
    return 1; // Applied
  } else {
    return 0; // Not yet applied
  }
};

const ScholarshipStatus = ({ appliedSchemes }) => {

  const { appId } = useParams();
  const handleRemove = async(schemeId) => {
      const response = await axios.post(`http://localhost:4000/student/remove-applied-scheme`, { appId: appId, schemeId: schemeId });
      if (response.data.success === true) {
        alert(response.data.message);
      } else {
        alert(response.data.message);
      }
  }

  return (
    <div className="scholarship-status-container">
    {appliedSchemes.map((scheme, index) => (
      <div key={index}>
        <p>{scheme.sch_name}</p>
        <ProgressBar progress={calculateProgress(scheme)} />
        <button onClick={() => handleRemove(scheme.sch_id)}>Remove application</button>
        <hr />
      </div>
    ))}
  </div>
  );


};

export default ScholarshipStatus;
