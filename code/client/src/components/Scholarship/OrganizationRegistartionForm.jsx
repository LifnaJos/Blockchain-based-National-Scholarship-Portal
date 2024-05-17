import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";

const OrganizationForm = (props) => {
  const navigate = useNavigate();
  const regId = props.regId;
  const [formData, setFormData] = useState({
    regId: regId, 
    scholarship_name: '',
    income_criteria: '',
    field_of_study: '',
    starts_on: '',
    ends_on: '',
    guidelines: null,
    _12AA_registered_no: '',
    donor_name: '',
    donation_amount: '',
    date_of_donation: '',
  });

  const [registrationCompleted, setRegistrationCompleted] = useState(false);
  const [schemeId, setSchemeId] = useState('');
  const [message,setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission here
    try {
      const newSchemeId = Math.random().toString(36).substr(2, 5).toUpperCase();
      setRegistrationCompleted(true);
      setSchemeId(newSchemeId);

      const formDataWithId = { ...formData, schemeId: newSchemeId };
      const response = await axios.post(`http://localhost:4000/po/scheme-form`, formDataWithId);

      if (response.data.success == false) {
        setMessage("Scheme registered successfully! Note your scheme ID.");
        alert("Scheme registered successfully! Note your scheme ID.");  
      } else {
        alert("Scheme registered successfully! Note your scheme ID.");
      }
      setTimeout(() => {
        navigate(`/organization-options/regId/${regId}`);
      }, 5000);
    } catch(error) {
      console.error("Error submitting form:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="container-fluid">
      <form onSubmit={handleSubmit}>
        <div className="row">
          {/* Scholarship Information */}
          <div className="col-md-6">
            <h3>Scholarship Information</h3>
            <div className="form-group">
              <label>Scholarship Name</label>
              <input type="text" className="form-control" name="scholarship_name" value={formData.scholarship_name} onChange={handleChange} placeholder="Enter scheme name"/>
            </div>
            {/* Income Criteria */}
            <div className="form-group">
              <label>Annual Income(Less Than)</label>
              <input type="text" className="form-control" name="income_criteria" value={formData.income_criteria} onChange={handleChange} placeholder='Enter Income Criteria' />
            </div>
            {/* Field of Study */}
            <div className="form-group">
              <label>Field of Study</label>
              <input type="text" className="form-control" name="field_of_study" value={formData.field_of_study} onChange={handleChange} placeholder='Field Of Study' />
            </div>
            {/* Start Date */}
            <div className="form-group">
              <label>Start Date</label>
              <input type="date" className="form-control" name="starts_on" value={formData.starts_on} onChange={handleChange} />
            </div>
            {/* End Date */}
            <div className="form-group">
              <label>End Date</label>
              <input type="date" className="form-control" name="ends_on" value={formData.ends_on} onChange={handleChange} />
            </div>
            {/* Guidelines */}
            <div className="form-group">
              <label>Guidelines (PDF)</label>
              {/* <textarea className="form-control" name="guidelines" value={formData.guidelines} onChange={handleChange} placeholder='Guidelines' /> */}
              <input type="file" className='form-control' name='guidelines' onChange={handleChange} />
            </div>
          </div>
          {/* Organization Information */}
          <div className="col-md-6">
            <h3>Organization Information</h3>
            {/* 12AA Registered Number */}
            <div className="form-group">
              <label>12AA Registered Number</label>
              <input type="text" className="form-control" name="_12AA_registered_no" value={formData._12AA_registered_no} onChange={handleChange} placeholder='12AA Number' />
            </div>
            {/* Donor Name */}
            <div className="form-group">
              <label>Donor Name</label>
              <input type="text" className="form-control" name="donor_name" value={formData.donor_name} onChange={handleChange} placeholder='Donor Name' />
            </div>
            {/* Donation Amount */}
            <div className="form-group">
              <label>Donation Amount</label>
              <input type="text" className="form-control" name="donation_amount" value={formData.donation_amount} onChange={handleChange} placeholder='Donation Amount' />
            </div>
            {/* Date of Donation */}
            <div className="form-group">
              <label>Date of Donation</label>
              <input type="date" className="form-control" name="date_of_donation" value={formData.date_of_donation} onChange={handleChange}  />
            </div>
          </div>
        </div>
        {/* Submit Button */}
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
      {message && message.includes("successfully") && (
      <div className="success-message" style={{ display: registrationCompleted ? 'block' : 'none' }}>
          <div className="registration-completed-box">
            <p><svg xmlns="http://www.w3.org/2000/svg" width="70" height="70" fill="currentColor" className="bi bi-check-circle" viewBox="0 0 16 16">
              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
              <path d="m10.97 4.97-.02.022-3.473 4.425-2.093-2.094a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05"/>
            </svg></p>
            <p>Registration completed!</p>
            <p>Scheme ID: {schemeId}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default OrganizationForm;
