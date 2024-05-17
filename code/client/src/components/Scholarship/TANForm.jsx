import React from 'react';
import { useNavigate } from "react-router-dom";
import axios from "axios";
function RedStar() {
  return <span style={{ color: 'red' }}>*</span>;
}


const OrganizationTanInput = (req,res) => {

  const navigate = useNavigate();

  const [tan, setTan] = React.useState("");
  const [userEnteredOTP,setUserEnteredOTP] = React.useState("");
  const [message,setMessage] = React.useState("");
  const [registrationCompleted, setRegistrationCompleted] = React.useState(false);
  const [registrationId, setRegistrationId] = React.useState('');

  const handleUserEnteredOtpChange = (e) => {
    setUserEnteredOTP(e.target.value);
  }

  const handleTanChange = (e) => {
    setTan(e.target.value);
  };

  const handleGetOtp = async () => {
    try {
      const response = await axios.post("http://localhost:4000/po/verify-tan", {    //first verifies TAN.
        tan: tan
      });

      if (response.data.success === true) {        //If TAN is valid, send otp
            try {
              const response = await axios.post("http://localhost:4000/otp/send-otp", { tan : tan});

              const responseOTPMessage = response.data.message;
              alert(responseOTPMessage);
            } catch(error) {
                console.error("Error sending OTP: ",error);
            }
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error("Error occurred while verifying TAN:", error);
      alert("Error occurred while verifying TAN. Please try again later.");
    }
  }

  const handleVerify=async()=>{

    try {
      const response = await axios.post('http://localhost:4000/otp/verify-otp', {
          tan : tan,
          userEnteredOTP : userEnteredOTP,
      });
      
      console.log(response.data);
      if (response.data.status == "success") {
        alert(response.data.message);
        setMessage(response.data.message);
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error("Error verifying OTP: ", error);
    }
  }

  const handleRegister = async() => {
    try {
      const newRegistrationId = Math.random().toString(36).substr(2, 10).toUpperCase();
      setRegistrationCompleted(true);
      setRegistrationId(newRegistrationId);

      const formData = { tan: tan, regId : newRegistrationId };
      const response = await axios.post(`http://localhost:4000/po/register-po`, formData);

      if (response.data.success == false) {
        setMessage("Organisation registered successfully! Note your registration ID.");
        alert("Organisation registered successfully! Note your registration ID.");  
      } else {
        alert("Organisation registered successfully! Note your registration ID.");
      }
      setTimeout(() => {
        navigate("/organization-login");
      }, 10000);

    } catch(error) {
      console.error("Error registering organisation:",error);
    }
  }
    
  return (
    <div className="card-form shadow p-4 mt-4">
      <div className="row">
        <div className="col-sm-5 mb-3">
          <label className="form-label">Registered TAN No. <RedStar /></label>
          <div className="input-group">
            <input
              type="text"
              placeholder="Enter Your Tan Number"
              required
              className="form-control"
              value={tan}
              onChange={handleTanChange}
              name='tan'
            />
            <button type="button" onClick={handleGetOtp} className="btn btn-sm btn-primary">Get OTP</button>
          </div>
        </div>
    </div>
      <div className="col-sm-2 mb-3">
        <label className="form-label">Enter OTP <RedStar /></label>
        <input
        type="text"
        maxLength="6"
        className="form-control"
        placeholder="Enter OTP"
        onChange={handleUserEnteredOtpChange}
        />
      </div>
      <div className="col-sm-3 mb-3">
        <label className="form-label d-block">&nbsp;</label>
        <button type="button" className="btn btn-md btn-primary" onClick={handleVerify}>Verify</button>
      </div>
      {message && message.includes("succes") && (
        <div className='col-sm3 mb-3'>
          <button type='button' className='btn btn-md btn-primary' style={{backgroundColor: "green", border: "green"}} onClick={handleRegister}>Register with ISP</button>
        </div>
      )}
      {message && message.includes("successfully") && (
      <div className="success-message" style={{ display: registrationCompleted ? 'block' : 'none' }}>
          <div className="registration-completed-box">
            <p><svg xmlns="http://www.w3.org/2000/svg" width="70" height="70" fill="currentColor" className="bi bi-check-circle" viewBox="0 0 16 16">
              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
              <path d="m10.97 4.97-.02.022-3.473 4.425-2.093-2.094a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05"/>
            </svg></p>
            <p>Registration completed!</p>
            <p>Your registration ID: {registrationId}</p>
          </div>
        </div>
      )}
    </div>
  );
} 

export default OrganizationTanInput;