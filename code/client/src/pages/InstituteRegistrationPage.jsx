import React from 'react';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../components/Header/Header";

function RedStar() {
  return <span style={{ color: 'red' }}>*</span>;
}

const InstituteApplicationForm = () => {
  const navigate = useNavigate();

  const [pan, setPan] = React.useState("");
  const [tan, setTan] = React.useState("");
  const [mobileNumber, setMobileNumber] = React.useState("");
  const [otp, setOtp] = React.useState("");
  const [userEnteredOtp, setUserEnteredOtp] = React.useState("");
  const [message, setMessage] = React.useState("");

  const handlePanChange = (e) => setPan(e.target.value);
  const handleTanChange = (e) => setTan(e.target.value);
  const handleMobileNumberChange = (e) => setMobileNumber(e.target.value);
  const handleUserEnteredOtpChange = (e) => setUserEnteredOtp(e.target.value);

  const handleGetOtp = async () => {
    try {
      const response = await axios.post("http://localhost:4000/otp/send-otp", { mobileNumber });
      const responseOtpMessage = response.data.message;
      alert(responseOtpMessage);
      setOtp(response.data.otp);
    } catch (error) {
      console.error("Error sending OTP: ", error);
      alert("Error sending OTP. Please try again later.");
    }
  };

  const handleVerifyOtp = async () => {
    if (userEnteredOtp === otp) {
      alert("OTP verified successfully!");
      navigate("/institute-application");
    } else {
      alert("Invalid OTP. Please try again.");
    }
  };

  return (
    <>
    <Header />
    <p className="text-center themeFontcolor" style={{ fontSize: "20px", backgroundColor: "#115a87", color: "#fff", padding: "20px",fontFamily:"Cambria, serif"}}>
                    <strong>Institute Registration</strong>
                </p>
                <hr />
    <div className="card-form shadow p-4 mt-4">
      <div className="row">
        <div className="col-sm-4 mb-3">
          <label className="form-label" style={{fontFamily:"Cambria, serif"}}>Enter PAN <RedStar /></label>
          <input
            type="text"
            className="form-control"
            value={pan}
            onChange={handlePanChange}
            name="pan"
            required
          />
        </div>
        <div className="col-sm-4 mb-3">
          <label className="form-label" style={{fontFamily:"Cambria, serif"}}>Enter TAN <RedStar /></label>
          <input
            type="text"
            className="form-control"
            value={tan}
            onChange={handleTanChange}
            name="tan"
            required
          />
        </div>
        <div className="col-sm-4 mb-3">
          <label className="form-label" style={{fontFamily:"Cambria, serif"}}>Enter Mobile Number <RedStar /></label>
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              value={mobileNumber}
              onChange={handleMobileNumberChange}
              name="mobileNumber"
              required
            />
            <button type="button" onClick={handleGetOtp} className="btn btn-sm btn-primary">Get OTP</button>
          </div>
        </div>
        <div className="col-sm-4 mb-3">
          <label className="form-label" style={{fontFamily:"Cambria, serif"}}>Enter OTP <RedStar /></label>
          <input
            type="text"
            maxLength="6"
            className="form-control"
            value={userEnteredOtp}
            onChange={handleUserEnteredOtpChange}
          />
        </div>
        <div className="col-sm-4 mb-3">
          <label className="form-label d-block">&nbsp;</label>
          <button type="button" className="btn btn-md btn-primary" onClick={handleVerifyOtp} style={{fontFamily:"Cambria, serif"}}>Verify OTP</button>
        </div>
      </div>
    </div>
    </>
  );
};

export default InstituteApplicationForm;
