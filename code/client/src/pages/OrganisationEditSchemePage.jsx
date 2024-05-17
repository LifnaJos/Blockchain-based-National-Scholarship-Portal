import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from "axios";
import Header from '../components/Header/Header';

const EditScheme = () => {
  const navigate = useNavigate();
  const { registrationId, schemeId } = useParams();
  const [formData, setFormData] = useState({
    regId: '',
    scholarship_name: '',
    income_criteria: '',
    field_of_study: '',
    starts_on: '',
    ends_on: '',
    guidelines: '',
    _12AA_registered_no: '',
    donor_name: '',
    donation_amount: '',
    date_of_donation: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(`http://localhost:4000/po/get-scheme`, { regId: registrationId, schemeId: schemeId });
        const responseData = response.data;
        setFormData({
          regId: responseData.reg_id,
          scholarship_name: responseData.sch_name,
          income_criteria: responseData.income_criteria,
          field_of_study: responseData.field_of_study,
          starts_on: responseData.start_date ? new Date(responseData.start_date).toISOString().split('T')[0] : '', // Format date properly
          ends_on: responseData.end_date ? new Date(responseData.end_date).toISOString().split('T')[0] : '', // Format date properly
          guidelines: responseData.guidelines,
          _12AA_registered_no: responseData._12aa_registered_no,
          donor_name: responseData.donor_name,
          donation_amount: responseData.donation_amount,
          date_of_donation: responseData.date_of_donation ? new Date(responseData.date_of_donation).toISOString().split('T')[0] : '', // Format date properly
        });
      } catch (error) {
        console.error("Error fetching scheme data:", error);
      }
    };

    fetchData();
  }, [registrationId, schemeId]);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value
    }));
  };

  const handleSaveChanges = async (e) => {
    try {
        const response = await axios.post(`http://localhost:4000/po/update-scheme`, { formData: formData, regId: registrationId, schemeId: schemeId });
        console.log(response.data);
        if (response.data.success === true) {
          alert("Scheme updation successfull!");
          navigate(`/organization-options/regId/${registrationId}`);
        } else {
          alert("Scheme updation successfull!"); 
        }
    } catch (error) {
        console.error("Error updating scheme:", error);
    }
   };

  return (
    <>
    <Header />
    <div className="container card-form shadow mt-4 p-4" style={{ fontFamily: 'Cambria, serif' }}>
            <div className="card-body bg-white">
                <p className="text-center themeFontcolor" style={{ fontSize: "20px", backgroundColor: "#115a87", color: "#fff", padding: "20px" }}>
                    <strong>Edit Scheme Details</strong>
                </p>
                <hr />
    <div className="container-fluid">
      <form className="card-form shadow p-4 mt-4">
        {/* Render form fields with existing data */}
        {/* Scholarship Information */}
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
        {/* Save Changes Button */}
        <button onClick={handleSaveChanges} className="btn btn-primary" >Save Changes</button>
      </form>
    </div>
    </div>
        </div>
    </>
  );
}

export default EditScheme;