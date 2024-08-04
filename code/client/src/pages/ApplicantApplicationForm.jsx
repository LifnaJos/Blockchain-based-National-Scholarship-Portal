import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import Header from "../components/Header/Header";

function RedStar() {
  return <span style={{ color: 'red' }}>*</span>;
}

const ApplicantApplicationForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const aadharNo = location.state?.aadharNo || ' '; // navigate.state is an object that contains the data passed from the previous route

  const [showConfirmationPopup, setShowConfirmationPopup] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [applicationId, setApplicationId] = useState('');
  const [error, setError] = useState('');

  // Define state for form inputs
  const [aname, setName] = useState('');
  const [ifsc, setIfsc] = useState('');
  const [dob, setDob] = useState('');
  const [panCard, setPanCard] = useState('');
  const [mobileNo, setMobileNo] = useState('');
  const [incomeAmount, setAnnualIncome] = useState('');
  const [address, setAddress] = useState('');
  const [incomeCertificate, setIncomeCertificate] = useState(null);
  const [digilockerQr, setDigilockerQr] = useState(null);


  const handleRegisterClick = () => {
    if (!aname || !ifsc || !dob || !panCard || !mobileNo || !incomeAmount || !address || !incomeCertificate || !digilockerQr) {
      setError('Please fill all the input fields.');
      return;
    }
    setError('');
    setShowConfirmationPopup(true);
  };
  
  const generateApplicationId = () => {
    const randomNumbers = Math.floor(1000 + Math.random() * 9000); // Generate random 4-digit number
    const randomId = `APP${randomNumbers}`; // Concatenate 'APP' and random number
    return randomId;
  };

  const handleConfirmRegistration = async () => {
    setShowConfirmationPopup(false);
    try {
      const newApplicationId = generateApplicationId();
      setApplicationId(newApplicationId);

      const formData = {
        aname,
        ifsc,
        dob,
        panCard,
        mobileNo,
        incomeAmount,
        address,
        incomeCertificate,
        digilockerQr,
        appId: newApplicationId,
        aadharNo
      };

      // Uncomment and use actual API call
      const response = await axios.post(`http://localhost:4000/applicant/register-applicant`, formData);

      // const response = { data: { success: true } }; // Simulated response for success

      if (response.data.success) {
        setShowSuccessPopup(true);
        setTimeout(() => {
          setShowSuccessPopup(false); // Close success popup after 10 seconds
          navigate("");
        }, 10000);
      } else {
        setError("Applicant registration failed!");
      }
    } catch (error) {
      console.error("Error registering applicant:", error);
      setError("Error registering applicant. Please try again.");
    }
  };

    // const formData = new FormData();
    // formData.append('appId', newApplicationId);
    // formData.append('aname', aname);
    // formData.append('ifsc', ifsc);
    // formData.append('dob', dob);
    // formData.append('panCard', panCard);
    // formData.append('mobileNo', mobileNo);
    // formData.append('incomeAmount', incomeAmount);
    // formData.append('address', address);
    // formData.append('incomeCertificate', incomeCertificate);
    // formData.append('digilockerQr', digilockerQr);

  const handleCancel = () => {
    setShowConfirmationPopup(false);
  };

  const formatIncome = (income) => {
    const x = income.replace(/,/g, '');
    const lastThree = x.substring(x.length - 3);
    const otherNumbers = x.substring(0, x.length - 3);
    const formattedValue = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + (otherNumbers ? "," : "") + lastThree;
    return formattedValue;
  };

  const handleIncomeChange = (e) => {
    const rawValue = e.target.value.replace(/,/g, '');
    if (!isNaN(rawValue)) {
      setAnnualIncome(rawValue);
    }
  };

  const isPanCardRequired = incomeAmount && parseFloat(incomeAmount) > 300001;

  return (
    <>
      <Header />
      <div className="container card-form shadow mt-4 p-4" style={{ fontFamily: 'Cambria, serif' }}>
        <div className="card-body bg-white">
          <p className="text-center themeFontcolor" style={{ fontSize: "20px", backgroundColor: "#115a87", color: "#fff", padding: "20px" }}>
            <strong>Applicant Application Form</strong>
          </p>
          <hr />
          <div className="card-form shadow p-4 mt-4">
            <div className="row">
              <div className="col-sm-5 mb-3">
                <label style={{ display: "block" }}>Name of Applicant <RedStar /></label>
                <input
                  type="text"
                  placeholder="Enter Name"
                  required
                  name="aname"
                  value={aname}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="col-sm-5 mb-3">
                <label style={{ display: "block" }}>Bank Account Number or IFSC Code <RedStar /></label>
                <input
                  type="text"
                  placeholder="Enter Bank Account Number and IFSC Code"
                  required
                  name="ifsc"
                  value={ifsc}
                  onChange={(e) => setIfsc(e.target.value)}
                />
              </div>

              <div className="col-sm-5 mb-3">
                <label style={{ display: "block" }}>Date of Birth <RedStar /></label>
                <input
                  type="date"
                  required
                  name="dob"
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                />
              </div>

              <div className="col-sm-5 mb-3">
                <label style={{ display: "block" }}>Father/Mother/Guardian/Organization PAN Card Number {isPanCardRequired && <RedStar />}</label>
                <input
                  type="text"
                  placeholder="Enter PAN Card Number"
                  required={isPanCardRequired}
                  name="panCard"
                  value={panCard}
                  onChange={(e) => setPanCard(e.target.value.toUpperCase())}
                />
              </div>

              <div className="col-sm-5 mb-3">
                <label style={{ display: "block" }}>Mobile Number <RedStar /></label>
                <input
                  type="tel"
                  placeholder="Enter Mobile Number"
                  required
                  name="mobileNo"
                  value={mobileNo}
                  onChange={(e) => setMobileNo(e.target.value)}
                />
              </div>

              <div className="col-sm-5 mb-3">
                <label style={{ display: "block" }}>Annual Income <RedStar /></label>
                <input
                  type="text"
                  placeholder="Enter Annual Income"
                  required
                  name="incomeAmount"
                  value={formatIncome(incomeAmount)}
                  onChange={handleIncomeChange}
                />
              </div>
             
              <div className="col-sm-5 mb-3">
                <label style={{ display: "block" }}>Address <RedStar /></label>
                <textarea
                  placeholder="Enter Address"
                  required
                  name="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
             
              <div className="col-sm-5 mb-3">
                <label style={{ display: "block" }}>Upload Annual Income Certificate (PDF) <RedStar /></label>
                <input
                  type="file"
                  accept="application/pdf"
                  name="incomeCertificate"
                  required
                  onChange={(e) => setIncomeCertificate(e.target.files[0])}
                />
              </div>

              <div className="col-sm-12 mb-3">
                <p style={{ fontSize: "16px", fontWeight: "bold" }}>
                  Note: Refer to this <a href="https://www.youtube.com/shorts/oCHrfJKd1-c" target="_blank" rel="noopener noreferrer">video</a> on how to access the Digilocker QR code.
                </p>
              </div>

              <div className="col-sm-5 mb-3">
                <label style={{ display: "block" }}>Digilocker QR Code <RedStar /></label>
                <input
                  type="file"
                  accept="application/pdf"
                  name="digilockerQr"
                  required
                  onChange={(e) => setDigilockerQr(e.target.files[0])}
                />
              </div>

              <button
                type="button"
                className="btn btn-md btn-primary"
                style={{ marginTop: "20px", paddingTop: "5px", paddingRight: "10px", height: "50px", width: "90px", marginLeft: "50px", display: "block", fontWeight: "bold" }}
                onClick={handleRegisterClick}
              >
                Register
              </button>
            </div>
          </div>
          {showConfirmationPopup && (
            <div className="popup">
              <div className="popup-inner">
                <h2>Confirm Application</h2>
                <p>Are you sure you want to register the application?</p>
                <button className="btn btn-md btn-primary" onClick={handleConfirmRegistration} style={{ marginRight: "10px" }}>Yes</button>
                <button className="btn btn-md btn-secondary" onClick={handleCancel}>No</button>
              </div>
            </div>
          )}
          {showSuccessPopup && (
            <div className="popup">
              <div className="popup-inner">
                <h2>Registration Successful</h2>
                <p>Your Application ID: {applicationId}</p>
                <button className="btn btn-md btn-primary" onClick={() => setShowSuccessPopup(false)}>Close</button>
              </div>
            </div>
          )}
        </div>
      </div>
      <style jsx>{`
        .popup {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.5);
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .popup-inner {
          background-color: #fff;
          padding: 20px;
          border-radius: 10px;
          text-align: center;
        }

        .btn-secondary {
          background-color: #6c757d;
          border-color: #6c757d;
        }
      `}</style>
    </>
  );
}

export default ApplicantApplicationForm;
