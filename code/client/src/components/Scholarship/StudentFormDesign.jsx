import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "./Scholarship.css";
import axios from 'axios';

const StudentForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    scholarship_name: '',
    candidate_name: '',
    college_name: '',
    college_id: '',
    branch: '',
    current_year_of_study: '',
    cgpa: '',
    fees_paid: '',
    income_certificate_no: '',
    account_holder_name: '',
    account_no: '',
    ifsc_code: '',
    bank_name: '',
    phone_no: '',
    aadhaar_no: '',
    eligible: false,
    virtual_id: '',
    gender: '',
    dob: '',
    address: '',
    email: ''
  });
  const [scholarshipsDrawerOpen, setScholarshipsDrawerOpen] = useState(false);
  const [registrationCompleted, setRegistrationCompleted] = useState(false);
  const [applicationId, setApplicationId] = useState('');
  const [scholarshipNames, setScholarshipNames] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchScholarshipNames = async () => {
      try {
        const response = await axios.post("http://localhost:4000/aadhaar/get-all-schemes");
        console.log(response.data);
        setScholarshipNames(response.data.schemeNames);
      } catch (error) {
        console.error("Error fetching scholarship names:", error);
      }
    };

    fetchScholarshipNames();
  }, []);

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
      const newApplicationId = Math.random().toString(36).substr(2, 10).toUpperCase();
      setRegistrationCompleted(true);
      setApplicationId(newApplicationId);
      const formDataWithId = { ...formData, applicationId: newApplicationId }
      const response = await axios.post(`http://localhost:4000/student/register-student`, formDataWithId);

      if (response.data.success == false) {
        setMessage("Student registered successfully! Note your application ID.");
        alert("Student registered successfully! Note your application ID.");
      } else {
        alert("Student registered successfully! Note your application ID.");
      }
      setTimeout(() => {
        navigate("/");
      }, 10000);
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("An error occurred. Please try again.");
    }
  };

  const handleDrawerToggle = () => {
    setScholarshipsDrawerOpen(prevState => !prevState);
  };

  return (
    <div className="container-fluid">
      <form onSubmit={handleSubmit}>
        <div className="row">
          {/* Scholarship Information */}
          <div className="col-md-6">
            {/* <h3>Scholarship Information</h3>
            <div className="form-group">
              <label>Scholarship Name</label>
              <input type="text" className="form-control" name="scholarship_name" value={formData.scholarship_name} onChange={handleChange} />
            </div> */}
            {/* Category */}
            <div className="form-group">
              <label>Scholarship Names</label>
              <select className="form-control" name="scholarship_name" value={formData.scholarship_name} onChange={handleChange}>
                {scholarshipNames.map((scholarshipName, index) => (
                  <option key={index} value={scholarshipName}>{scholarshipName}</option>
                ))}
              </select>
            </div>
          </div>
          {/* Student Information */}
          <div className="col-md-6">
            <h3>Student Information</h3>
            {/* Aadhaar Number */}
            <div className="form-group">
              <label>Aadhaar Number</label>
              <input type="text" className="form-control" name="aadhaar_no" value={formData.aadhaar_no} onChange={handleChange} />
            </div>
            {/* Virtual ID */}
            <div className="form-group">
              <label>or Virtual ID</label>
              <input type="text" className="form-control" name="virtual_id" value={formData.virtual_id} onChange={handleChange} />
            </div>
            {/* Candidate Name */}
            <div className="form-group">
              <label>Candidate Name</label>
              <input type="text" className="form-control" name="candidate_name" value={formData.candidate_name} onChange={handleChange} />
            </div>
            {/* Mobile No. */}
            <div className="form-group">
              <label>Mobile No.</label>
              <input type="text" className="form-control" name="phone_no" value={formData.phone_no} onChange={handleChange} />
            </div>
            {/* Email ID */}
            <div className="form-group">
              <label>Email ID</label>
              <input type="text" className="form-control" name="email" value={formData.email} onChange={handleChange} />
            </div>
            {/* Gender */}
            <div className="form-group">
              <label>Gender</label>
              <input type="text" className="form-control" name="gender" value={formData.gender} onChange={handleChange} />
            </div>
            {/* DOB */}
            <div className="form-group">
              <label>Date of Birth</label>
              <input type="date" className="form-control" name="dob" value={formData.dob} onChange={handleChange} />
            </div>
            {/* Address */}
            <div className="form-group">
              <label>Address</label>
              <input type="text" className="form-control" name="address" value={formData.address} onChange={handleChange} />
            </div>
            {/* College Name */}
            <div className="form-group">
              <label>College Name</label>
              <input type="text" className="form-control" name="college_name" value={formData.college_name} onChange={handleChange} />
            </div>
            {/* College ID */}
            <div className="form-group">
              <label>College ID</label>
              <input type="text" className="form-control" name="college_id" value={formData.college_id} onChange={handleChange} />
            </div>
            {/* Branch */}
            <div className="form-group">
              <label>Branch</label>
              <input type="text" className="form-control" name="branch" value={formData.branch} onChange={handleChange} />
            </div>
            {/* Current Year of Study */}
            <div className="form-group">
              <label>Current Year of Study</label>
              <input type="text" className="form-control" name="current_year_of_study" value={formData.current_year_of_study} onChange={handleChange} />
            </div>
          </div>
        </div>
        <hr />
        <div className="row">
          {/* Academic Information */}
          <div className="col-md-6">
            <h3>Academic Information</h3>
            {/* CGPA */}
            <div className="form-group">
              <label>CGPA</label>
              <input type="text" className="form-control" name="cgpa" value={formData.cgpa} onChange={handleChange} />
            </div>
            {/* Fees Paid */}
            <div className="form-group">
              <label>Fees Paid</label>
              <input type="text" className="form-control" name="fees_paid" value={formData.fees_paid} onChange={handleChange} />
            </div>
            {/* Income Certificate Number (current year) */}
            <div className="form-group">
              <label>Income Certificate Number (current year)</label>
              <input type="text" className="form-control" name="income_certificate_no" value={formData.income_certificate_no} onChange={handleChange} />
            </div>
          </div>
          {/* Bank Details */}
          <div className="col-md-6">
            <h3>Bank Details</h3>
            {/* Account Holder Name */}
            <div className="form-group">
              <label>Account Holder Name</label>
              <input type="text" className="form-control" name="account_holder_name" value={formData.account_holder_name} onChange={handleChange} />
            </div>
            {/* Account Number */}
            <div className="form-group">
              <label>Account Number</label>
              <input type="text" className="form-control" name="account_no" value={formData.account_no} onChange={handleChange} />
            </div>
            {/* IFSC Code */}
            <div className="form-group">
              <label>IFSC Code</label>
              <input type="text" className="form-control" name="ifsc_code" value={formData.ifsc_code} onChange={handleChange} />
            </div>
            {/* Bank Name */}
            <div className="form-group">
              <label>Bank Name</label>
              <input type="text" className="form-control" name="bank_name" value={formData.bank_name} onChange={handleChange} />
            </div>
          </div>
        </div>
        {/* Submit Button */}
        <button type="submit" className="btn btn-primary">Submit</button>
        {/* Success Message */}
        <div className="success-message" style={{ display: registrationCompleted ? 'block' : 'none' }}>
          <div className="registration-completed-box">
            <p><svg xmlns="http://www.w3.org/2000/svg" width="70" height="70" fill="currentColor" className="bi bi-check-circle" viewBox="0 0 16 16">
              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
              <path d="m10.97 4.97-.02.022-3.473 4.425-2.093-2.094a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05" />
            </svg></p>
            <p>Registration completed!</p>
            <p>Your application ID: {applicationId}</p>
          </div>
        </div>
      </form>
    </div>
  );
}

export default StudentForm;
