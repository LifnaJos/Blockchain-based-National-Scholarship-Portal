import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";

const options = [
  'Undergraduate',
  'Medical',
  'Law Student',
  'CA',
  'Post Graduation'
];

const religions = [
  'Christianity',
  'Islam',
  'Hinduism',
  'Buddhism',
  'Judaism',
  'Sikhism',
  'Atheism',
  'Other',
];

const castes = [
  'General',
  'OBC',
  'SC',
  'ST',
  'Other',
];

const OrganizationForm = (props) => {
  const navigate = useNavigate();
  const regId = props.regId;

  const [formData, setFormData] = useState({
    regId: regId,
    scholarship_name: '',
    income_criteria: '',
    age_limit: '',
    field_of_study: [],
    hsc_score: '',
    ssc_score: '',
    religion: '',
    caste: '',
    starts_on: '',
    ends_on: '',
    official_url: '',
    guidelines: null,
    _12AA_registered_no: '',
    sch_org_name: '',
    scholarship_amount: '',
    academic_year: '',
  });

  const [registrationCompleted, setRegistrationCompleted] = useState(false);
  const [schemeId, setSchemeId] = useState('');
  const [message, setMessage] = useState("");
  const [number, setNumber] = useState("");
  const [words, setWords] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedFields, setSelectedFields] = useState([]);
  const [error, setError] = useState('');


  const belowTwenty = ["", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"];
  const tens = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];
  const aboveThousand = ["", "Thousand", "Million", "Billion"];

  const numberToWords = (num) => {
    if (num === 0) return "Zero";

    const helper = (n) => {
      if (n < 20) return belowTwenty[n];
      if (n < 100) return tens[Math.floor(n / 10)] + (n % 10 ? " " + belowTwenty[n % 10] : "");
      if (n < 1000) return belowTwenty[Math.floor(n / 100)] + " Hundred" + (n % 100 ? " " + helper(n % 100) : "");
      return "";
    };

    let word = "";
    let thousandCounter = 0;

    while (num > 0) {
      if (num % 1000 !== 0) {
        word = helper(num % 1000) + (aboveThousand[thousandCounter] ? " " + aboveThousand[thousandCounter] : "") + " " + word;
      }
      num = Math.floor(num / 1000);
      thousandCounter++;
    }

    return word.trim();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value
    }));

    if (name === "scholarship_amount") {
      const num = parseInt(value);
      setNumber(value);
      setWords(isNaN(num) ? "" : numberToWords(num));
    }
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: files[0]
    }));
  };

  const handleFieldChange = (e) => {
    const { value, checked } = e.target;
    setSelectedFields(prevSelectedFields =>
      checked
        ? [...prevSelectedFields, value]
        : prevSelectedFields.filter(field => field !== value)
    );
    setFormData(prevFormData => ({
      ...prevFormData,
      field_of_study: checked
        ? [...prevFormData.field_of_study, value]
        : prevFormData.field_of_study.filter(field => field !== value)
    }));
  };

  const handleDropdownToggle = () => {
    setIsDropdownOpen(prev => !prev);
  };

  const handleReligionChange = (e) => {
    const { value } = e.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      religion: value
    }));
  };

  const handleCasteChange = (e) => {
    const { value } = e.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      caste: value
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

      if (response.data.success) {
        setRegistrationCompleted(true);
        setTimeout(() => {
          setRegistrationCompleted(false); // Close success popup after 10 seconds
          navigate("/scholarshipDetail");
        }, 10000);
      } else {
        setError("Scholarship registration failed!");
      }
    } catch (error) {
      console.error("Error registering scholarship:", error);
      setError("Error registering sholarship. Please try again.");
    }
  };

  // const handleRegisterClick = () => {
  //   if (!_12AA_registered_no || !sch_org_name || !scholarship_amount || !academic_year || !scholarship_name || !income_criteria || !age_limit || !field_of_study || !hsc_score || !ssc_score || !religion || !caste || !starts_on || !ends_on || !official_url || !guidelines) {
  //     setError('Please fill all the input fields.');
  //     return;
  //   }
  //   setError('');
  //   setShowConfirmationPopup(true);
  // };
 
  const handleCloseClick = async () => {
    try{
      
      const displayData = { schemeId };

      const response = await axios.post(`https://localhost:4000/po/display-scheme`, displayData);
      if(response.data.success){
        navigate("/scholarship-displayScheme");
      }
      else{
        setError("Scheme Not Registered");
      }
    }
    catch(error){
      console.error("Error registering scheme:", error);
      setError("Error registering Scheme. Please try again.");

    }

  };

  return (
    <>
    <div className="container-fluid">
      <form onSubmit={handleSubmit}>
        <div className="row">
          {/* Organization Information */}
          <div>
            <h3>Organization Information</h3>
            <div className="form-group">
              <label>12AA Registered Number</label>
              <input type="text" className="form-control" name="_12AA_registered_no" value={formData._12AA_registered_no} onChange={handleChange} placeholder='12AA Number' />
            </div>
            <div className="form-group">
              <label>Scholarship Organization Name</label>
              <input type="text" className="form-control" name="sch_org_name" value={formData.sch_org_name} onChange={handleChange} placeholder='Organization Name' />
            </div>
            <div className="form-group">
              <label>Scholarship Amount</label>
              <input type="number" className="form-control" name="scholarship_amount" value={number} onChange={handleChange} placeholder='Scholarship Amount' />
              <div>{words}</div>
            </div>
            <div className="form-group">
              <label>Academic Year</label>
              <input type="date" className="form-control" name="academic_year" value={formData.academic_year} onChange={handleChange} />
            </div>
          </div>

          {/* Scholarship Information */}
          <div>
            <h3>Scholarship Information</h3>
            <div className="form-group">
              <label>Scholarship Name</label>
              <input type="text" className="form-control" name="scholarship_name" value={formData.scholarship_name} onChange={handleChange} placeholder="Enter scheme name" />
            </div>
            <h3>Eligibility Criteria</h3>
            <div className="form-group">
              <label>Annual Income(Less Than)</label>
              <input type="text" className="form-control" name="income_criteria" value={formData.income_criteria} onChange={handleChange} placeholder='Enter Income Criteria' />
            </div>
            <div className="form-group">
              <label>Age Limit</label>
              <input type="text" className="form-control" name="age_limit" value={formData.age_limit} onChange={handleChange} placeholder='Age Limit' />
            </div>
            <div className="form-group">
              <label>Field of Study</label>
              <div className="dropdown">
                <div className="selected-fields" onClick={handleDropdownToggle}>
                  {selectedFields.length > 0 ? selectedFields.join(', ') : 'Select Fields of Study'}
                </div>
                {isDropdownOpen && (
                  <div className="dropdown-content">
                    {options.map((option) => (
                      <label key={option}>
                        <input
                          type="checkbox"
                          value={option}
                          checked={selectedFields.includes(option)}
                          onChange={handleFieldChange}
                        />
                        {option}
                      </label>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div className="form-group">
              <label>HSC Score</label>
              <input type="text" className="form-control" name="hsc_score" value={formData.hsc_score} onChange={handleChange} placeholder='HSC Score' />
            </div>
            <div className="form-group">
              <label>SSC Score</label>
              <input type="text" className="form-control" name="ssc_score" value={formData.ssc_score} onChange={handleChange} placeholder='SSC Score' />
            </div>
            <div className="form-group">
              <label>Religion</label>
              <select className="form-control" name="religion" value={formData.religion} onChange={handleReligionChange}>
                <option value="">Select Religion</option>
                {religions.map(religion => (
                  <option key={religion} value={religion}>{religion}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Caste</label>
              <select className="form-control" name="caste" value={formData.caste} onChange={handleCasteChange}>
                <option value="">Select Caste</option>
                {castes.map(caste => (
                  <option key={caste} value={caste}>{caste}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Starts On</label>
              <input type="date" className="form-control" name="starts_on" value={formData.starts_on} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Ends On</label>
              <input type="date" className="form-control" name="ends_on" value={formData.ends_on} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Official URL</label>
              <input type="url" className="form-control" name="official_url" value={formData.official_url} onChange={handleChange} placeholder="Enter Official URL" />
            </div>
            <div className="form-group">
              <label>Guidelines</label>
              <input type="file" className="form-control" name="guidelines" onChange={handleFileChange} />
            </div>
          </div>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
      {registrationCompleted && (
            <div className="popup">
              <div className="popup-inner">
                <h2>Scheme Registered Successfully</h2>
                <p>Your Scheme ID: {schemeId}</p>
                <button className="btn btn-md btn-primary" onClick={() => setRegistrationCompleted(false)}>Close</button>
                {/* <button className="btn btn-md btn-primary" onClick={handleCloseClick}>Close</button> */}

              </div>
            </div>
          )}
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
};

export default OrganizationForm;
