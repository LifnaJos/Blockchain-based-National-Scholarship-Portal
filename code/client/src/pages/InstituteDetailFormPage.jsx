import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from "../components/Header/Header";

function InstituteDetailFormPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { data } = location.state || { data: [] };

  return (
    <>
      <Header />
      <div className="container mt-4">
        <h2>Institute Data</h2>
        {data.length > 0 ? (
          <ul>
            {data.map((item, index) => (
              <li key={index}>
                <strong>Registration ID:</strong> {item.reg_id}<br />
                <strong>Mobile Number:</strong> {item.mobile_number}<br />
                <strong>Email:</strong> {item.email}<br />
                <strong>College Name:</strong> {item.college_name}<br />
                <strong>Address:</strong> {item.address}<br />
                <strong>City:</strong> {item.city}<br />
                <strong>State:</strong> {item.state}
              </li>
            ))}
          </ul>
        ) : (
          <p>No data found</p>
        )}
        <button onClick={() => navigate(-1)} className="btn btn-primary">Back</button>
      </div>
    </>
  );
}

export default InstituteDetailFormPage;
