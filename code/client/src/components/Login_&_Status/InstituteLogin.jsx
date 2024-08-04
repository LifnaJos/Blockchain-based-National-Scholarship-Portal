import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../Header/Header";
import { Captcha } from "../OTP & Captcha/Captcha";
import axios from "axios";

function RedStar() {
  return <span style={{ color: 'red' }}>*</span>;
}

function InstituteLogin() {
  return (
    <>
      <Header />
      <div className="container card-form shadow mt-4 p-4" style={{ fontFamily: 'Cambria, serif' }}>
        <div className="card-body bg-white">
          <p className="text-center themeFontcolor" style={{ fontSize: "20px", backgroundColor: "#115a87", color: "#fff", padding: "20px" }}>
            <strong>Intelligent Scholarship Portal 2024-25 - Institute / College Login</strong>
          </p>
          <hr />
          <InstituteInput />
        </div>
      </div>
    </>
  );
}

function InstituteInput({ setData }) {
  const navigate = useNavigate();
  const [instituteId, setInstituteId] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [generatedOtp, setGeneratedOtp] = useState('');
  const [isOtpVerified, setIsOtpVerified] = useState(false);

  const handleGenerateOtpClick = () => {
    const newOtp = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(newOtp);
    alert(`OTP has been sent to ${mobileNumber}. OTP: ${newOtp}`); // Displaying OTP for testing purposes
  };

  const handleVerifyOtpClick = () => {
    if (otp === generatedOtp) {
      setIsOtpVerified(true);
      alert('OTP Verified');
    } else {
      alert('Invalid OTP');
    }
  };

  // const handleLoginClick = () => {
  //   if (isOtpVerified) {
  //     navigate("/student-list-for-verification");
  //   } else {
  //     alert('Please verify the OTP first');
  //   }
  // };

  const handleLoginClick = async () => {
    if (isOtpVerified) {
      try {
        const response = await axios.post('http://localhost:4000/institute/register-institute-display', { appId: instituteId });
        if (response.data.message) {
          alert(response.data.message);
        } else {
          setData(response.data);
          navigate("/institute-detail");
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        alert('Error fetching data');
      }
    } else {
      alert('Please verify the OTP first');
    }
  };

  return (
    <div className="card-form shadow p-4 mt-4">
      <div className="row">
        <div className="col-sm-5 mb-3">
          <label className="form-label">Enter Institute / College Id <RedStar /></label>
          <div className="input-group">
            <input
              type="text"
              placeholder=""
              required
              className="form-control"
              value={instituteId}
              onChange={(e) => setInstituteId(e.target.value)}
            />
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-sm-5 mb-3">
          <label className="form-label">Enter Mobile Number <RedStar /></label>
          <input
            type="text"
            placeholder="Enter your mobile number"
            required
            className="form-control"
            value={mobileNumber}
            onChange={(e) => setMobileNumber(e.target.value)}
          />
        </div>
        <div className="col-sm-3 mb-3">
          <label className="form-label d-block">&nbsp;</label>
          <button type="button" className="btn btn-md btn-primary" onClick={handleGenerateOtpClick}>Generate OTP</button>
        </div>
      </div>
      <div className="row">
        <div className="col-sm-5 mb-3">
          <label className="form-label">Enter OTP <RedStar /></label>
          <input
            type="text"
            maxLength="6"
            className="form-control"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
        </div>
        <div className="col-sm-3 mb-3">
          <label className="form-label d-block">&nbsp;</label>
          <button type="button" className="btn btn-md btn-primary" onClick={handleVerifyOtpClick}>Verify OTP</button>
        </div>
      </div>
      <Captcha />
      <div className="row">
        <div className="col-sm-3 mb-3">
          <label className="form-label d-block">&nbsp;</label>
          <button type="button" className="btn btn-md btn-primary" onClick={handleLoginClick}>Login</button>
        </div>
      </div>
    </div>
  );
}

export default InstituteLogin;