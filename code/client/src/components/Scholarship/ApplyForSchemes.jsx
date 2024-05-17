import React, { useState, useEffect } from 'react';
import Header from '../Header/Header';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const ApplyForSchemes = ({ schemes, appId }) => {
  const [fundsDisbursed, setFundsDisbursed] = useState(false);
  const navigate = useNavigate();
  const [pdfData, setPdfData] = useState(null);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
  
    return `${day}-${month}-${year}`;
  };

  const handleApply = async (schemeId,schemeName) => {
    console.log('I got clicked!');
    try {
      const response = await axios.post(`http://localhost:4000/student/apply-scheme`, { appId: appId, schemeId: schemeId, schemeName: schemeName });
      console.log(response.data);
      if (response.data.success===true) {
        alert(response.data.message);
      } else {
        alert(response.data.message);
      }
    } catch(error) {
      console.error("Error applying for scheme: ",error);
    }
  }

  return (
    <div className="container-fluid">
      <h4>Current Available Scholarships</h4>
      {schemes.length > 0 ? (<table className="table">
        <thead>
          <tr>
            <th>Scheme Name</th>
            <th>Provider Name</th>
            <th>Income Criteria(less than)</th>
            <th>Field of Study</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Apply</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          {schemes.map((scheme) => (
            <tr key={scheme.sch_id}>
              <td>{scheme.sch_name}</td>
              <td>{scheme.organisation_name}</td>
              <td>{scheme.income_criteria}</td>
              <td>{scheme.field_of_study}</td>
              <td>{formatDate(scheme.start_date)}</td>
              <td>{formatDate(scheme.end_date)}</td>
              <td><button className='btn btn-success' onClick={() => handleApply(scheme.sch_id,scheme.sch_name)}>Apply</button></td>
              <td><button className='btn btn-primary'>Details</button></td>
            </tr>
          ))}
        </tbody>
      </table>) : (
        <p>No schemes online!</p>
      )}
      {/*
      <div>
        <button className="btn btn-primary mr-2 d-print-none" onClick={handlePrint}>Print</button>
        {fundsDisbursed ? (
          <button className="btn btn-primary d-print-none" onClick={handlePrintCertificate}>Print 80G Certificate</button>
        ) : (
          <button className="btn btn-success d-print-none" onClick={handleDisburseFunds}>Disbursed Funds to Applicants</button>
        )}
      </div>
      */}
    </div>
  );
};

export default ApplyForSchemes;
