import React from 'react';
import "./ProgressBar.css";

const ProgressBar = ({ progress }) => {
  const steps = [
    { title: "Applied", color: progress >= 1 ? "#28a745" : "#ff0000" },
    { title: "Approved", color: progress >= 2 ? "#28a745" : "#ff0000" },
    { title: "Funds Disbursed", color: progress === 3 ? "#28a745" : "#ff0000" },
  ];

  return (
    <div className="progress-bar-container">
      {steps.map((step, index) => (
        <div
          key={index}
          className={`progress-step ${progress >= index + 1 ? 'active' : ''}`}
          style={{ backgroundColor: step.color }}
        >
          {step.title}
        </div>
      ))}
    </div>
  );
};

export default ProgressBar;
