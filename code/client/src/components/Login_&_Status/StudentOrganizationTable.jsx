import React, { useState } from 'react';
import Header from '../Header/Header';
import axios from 'axios';

const OrganizationTable = ({ applicants }) => {
  const [selectedApplicants, setSelectedApplicants] = useState([]);

  const handleCheckboxChange = (appId) => {
    setSelectedApplicants((prevSelected) => {
      if (prevSelected.includes(appId)) {
        return prevSelected.filter((id) => id !== appId);
      } else {
        return [...prevSelected, appId];
      }
    });
  };

  const handleDisburseFunds = async () => {
    try {
      
    } catch (error) {
      console.error('Error disbursing funds:', error);
    }
  };

  return (
    <div className="container-fluid">
      <h4>List of Approved Students</h4>
      <table className="table">
        <thead>
          <tr>
            <th>Application ID</th>
            <th>Candidate Name</th>
            <th>Annual Income</th>
            <th>Disburse Funds</th>
          </tr>
        </thead>
        <tbody>
          {applicants.map((applicant, index) => (
            <tr key={index}>
              <td>{applicant.application_id}</td>
              <td>{applicant.candidate_name}</td>
              <td>{applicant.annual_income}</td>
              <td>
                <input
                  type="checkbox"
                  checked={selectedApplicants.includes(applicant.application_id)}
                  onChange={() => handleCheckboxChange(applicant.application_id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <button className="btn btn-primary d-print-none" onClick={handleDisburseFunds}>
          Disburse Funds
        </button>
      </div>
    </div>
  );
};

export default OrganizationTable;
