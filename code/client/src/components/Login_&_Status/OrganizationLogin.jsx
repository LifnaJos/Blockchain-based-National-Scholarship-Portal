import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "../Header/Header";
import axios from "axios";

function RedStar() {
    return <span style={{ color: 'red' }}>*</span>;
}

function OrganizationLogin(){
    return <>
        <Header />
        <div className="container card-form shadow mt-4 p-4" style={{ fontFamily: 'Cambria, serif' }}>
            <div className="card-body bg-white">
                <p className="text-center themeFontcolor" style={{ fontSize: "20px", backgroundColor: "#115a87", color: "#fff", padding: "20px" }}>
                    <strong>Organization Login</strong>
                </p>
                <hr />
                <OrganizationRegisteredInput />
            </div>
        </div>
    </>;
}

function OrganizationRegisteredInput(){

    const navigate = useNavigate();
    const [registrationId, setRegistrationId] = React.useState("");
    const [userEnteredOTP,setUserEnteredOTP] = React.useState("");
    const [message,setMessage] = React.useState("");

    const handleUserEnteredOtpChange = (e) => {
        setUserEnteredOTP(e.target.value);
    }

    const handleRegIdChange = (e) => {
        setRegistrationId(e.target.value);
    };

    const handleGetOtp = async () => {
        try {
          const response = await axios.post("http://localhost:4000/po/verify-regId", {    //first verifies registration ID.
                registrationId : registrationId
          });
    
          if (response.data.success === true) {        //If registration ID is valid, send otp
                try {
                  const response = await axios.post("http://localhost:4000/otp/regId/send-otp", { registrationId : registrationId });
    
                  const responseOTPMessage = response.data.message;
                  alert(responseOTPMessage);
                } catch(error) {
                    console.error("Error sending OTP: ",error);
                }
          } else {
            alert("Invalid Registration ID.");
          }
        } catch (error) {
          console.error("Error occurred while verifying registration ID:", error);
          alert("Error occurred while verifying registration ID. Please try again later.");
        }
      }

    const handleVerify = async () => {
        try {
            const response = await axios.post('http://localhost:4000/otp/regId/verify-otp', {
                registrationId : registrationId,
                userEnteredOTP : userEnteredOTP,
            });
            
            console.log(response.data);
            if (response.data.status == "success") {
              setMessage(response.data.message);
              alert(response.data.message);
              navigate(`/organization-options/regId/${registrationId}`);
            } else {
              alert(response.data.message);
            }
        } catch (error) {
            console.error("Error verifying OTP: ", error);
        }
    }
    
    return <>
    <div className="card-form shadow p-4 mt-4">
    <div className="row">
    <div className="col-sm-5 mb-3">
        <label className="form-label">Registration ID<RedStar /></label>
        <div className="input-group">
            <input
            type="text"
            placeholder="Enter your registration ID"
            required
            className="form-control"
            name="registrationId"
            onChange={handleRegIdChange}
            />
            <button type="button" className="btn btn-sm btn-primary" onClick={handleGetOtp}>Get OTP</button>
        </div>
    </div>
    </div>
    {/* <OtpInput /> */}
    {/* <Captcha /> */}
    <div className="col-sm-2 mb-3">
        <label className="form-label">Enter OTP <RedStar /></label>
        <input
        type="text"
        maxLength="6"
        className="form-control"
        placeholder="Enter OTP"
        onChange={handleUserEnteredOtpChange}
        name="userEnteredOTP"
        />
    </div>
    <div className="col-sm-3 mb-3">
        <label className="form-label d-block">&nbsp;</label>
        <button type="button" className="btn btn-md btn-primary" onClick={handleVerify}>Verify</button>
    </div>
    </div>
    </>
}

export default OrganizationLogin;