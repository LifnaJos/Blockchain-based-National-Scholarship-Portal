import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../components/Header/Header";

function RedStar() {
  return <span style={{ color: 'red' }}>*</span>;
}

const InstituteApplicationForm = () => {
  const navigate = useNavigate();
  const [showConfirmationPopup, setShowConfirmationPopup] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [applicationId, setApplicationId] = useState('');
  const [error, setError] = useState('');

  // Define state for form inputs
  const [heid, setHeid] = useState('');
  const [pan, setPan] = useState('');
  const [tan, setTan] = useState('');
  const [email, setEmail] = useState('');
  const [collegeName, setCollegeName] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [mobNum, setMobNum] = useState('');
  const [state, setState] = useState('');

  const handleRegisterClick = () => {
    if (!heid || !pan || !tan || !email || !collegeName || !address || !city || !mobNum || !state) {
      setError('Please fill all the input fields.');
      return;
    }
    setError('');
    setShowConfirmationPopup(true);
  };

  const generateApplicationId = () => {
    const stateInitials = state.slice(0, 2).toUpperCase(); // Get first two letters of state
    const heiInitials = heid.slice(0, 2).toUpperCase(); // Get first two letters of HEI_id
    const randomNumbers = Math.floor(100000 + Math.random() * 900000); // Generate random 6-digit number
    const randomId = `EI_${stateInitials}_${heiInitials}${randomNumbers}`; // Concatenate 'EI_', state initials, HEI initials, and random number
    return randomId;
  };

  const handleConfirmRegistration = async () => {
    setShowConfirmationPopup(false);
    try {
      const newApplicationId = generateApplicationId();
      setApplicationId(newApplicationId);

      const formData = {
        heid,
        pan,
        tan,
        email,
        collegeName,
        address,
        city,
        state,
        mobNum,
        appId: newApplicationId,
      };

      // Uncomment and use actual API call
      const response = await axios.post(`http://localhost:4000/institute/register-institute`, formData);

      // const response = { data: { success: true } }; // Simulated response for success

      if (response.data.success) {
        setShowSuccessPopup(true);
        setTimeout(() => {
          setShowSuccessPopup(false); // Close success popup after 10 seconds
          navigate("/institute-login");
        }, 10000);
      } else {
        setError("Institute registration failed!");
      }
    } catch (error) {
      console.error("Error registering institute:", error);
      setError("Error registering institute. Please try again.");
    }
  };

  const handleCancel = () => {
    setShowConfirmationPopup(false);
  };

  return (
    <>
      <Header />
      <div className="container card-form shadow mt-4 p-4" style={{ fontFamily: 'Cambria, serif' }}>
        <div className="card-body bg-white">
          <p className="text-center themeFontcolor" style={{ fontSize: "20px", backgroundColor: "#115a87", color: "#fff", padding: "20px" }}>
            <strong>Institute Application Form</strong>
          </p>
          <hr />
          <div className="card-form shadow p-4 mt-4">
            <div className="row">
              {error && <div className="alert alert-danger" role="alert">{error}</div>}
              {/* Form fields */}
              {[
                { label: "Enter HEI_id", value: heid, onChange: setHeid },
                { label: "PAN number", value: pan, onChange: setPan },
                { label: "TAN number", value: tan, onChange: setTan },
                { label: "Mobile Number", value: mobNum, onChange: setMobNum, type: "tel" },
                { label: "Official E-mail", value: email, onChange: setEmail },
                { label: "College Name", value: collegeName, onChange: setCollegeName },
                { label: "Address", value: address, onChange: setAddress },
                { label: "City", value: city, onChange: setCity }
              ].map((field, index) => (
                <div key={index} className="col-sm-5 mb-3">
                  <label style={{ display: "block" }}>{field.label} <RedStar /></label>
                  <input
                    type={field.type || "text"}
                    placeholder={`Enter ${field.label}`}
                    required
                    name={field.label.toLowerCase().replace(/ /g, "")}
                    value={field.value}
                    onChange={(e) => field.onChange(e.target.value)}
                  />
                </div>
              ))}
              <div className="col-sm-5 mb-3">
                <label style={{ display: "block" }}>State <RedStar /></label>
                <select
                  required
                  name="state"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  style={{ display: "block", width: "100%" }}
                >
                  <option value="" disabled>Select State</option>
                  {/* Corrected state abbreviations */}
                  <option value="MH">MH - Maharashtra</option>
                  <option value="UK">UK - Uttarakhand</option>
                  <option value="AP">AP - Andhra Pradesh</option>
                  <option value="AR">AR - Arunachal Pradesh</option>
                  <option value="AS">AS - Assam</option>
                  <option value="BR">BR - Bihar</option>
                  <option value="CG">CG - Chhattisgarh</option>
                  <option value="CH">CH - Chandigarh</option>
                  <option value="DL">DL - Delhi</option>
                  <option value="GA">GA - Goa</option>
                  <option value="GJ">GJ - Gujarat</option>
                  <option value="HP">HP - Himachal Pradesh</option>
                  <option value="HR">HR - Haryana</option>
                  <option value="JH">JH - Jharkhand</option>
                  <option value="KA">KA - Karnataka</option>
                  <option value="KL">KL - Kerala</option>
                  <option value="ML">ML - Meghalaya</option>
                  <option value="MN">MN - Manipur</option>
                  <option value="MP">MP - Madhya Pradesh</option>
                  <option value="MZ">MZ - Mizoram</option>
                  <option value="NL">NL - Nagaland</option>
                  <option value="OD">OD - Odisha</option>
                  <option value="PB">PB - Punjab</option>
                  <option value="PY">PY - Pondicherry</option>
                  <option value="RJ">RJ - Rajasthan</option>
                  <option value="SK">SK - Sikkim</option>
                  <option value="TN">TN - Tamil Nadu</option>
                  <option value="TR">TR - Tripura</option>
                  <option value="TS">TS - Telangana</option>
                  <option value="UP">UP - Uttar Pradesh</option>
                  <option value="WB">WB - West Bengal</option>
                </select>
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

export default InstituteApplicationForm;
