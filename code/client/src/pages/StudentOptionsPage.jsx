import React, { useState, useEffect } from "react";
import Header from "../components/Header/Header";
import ApplyForScholarship from "../components/Scholarship/ApplyForSchemes";
import StudentOptionsForm from "../components/Scholarship/StudentOptionsForm";
import ScholarshipStatus from "../components/Scholarship/ScholarshipStatus";
import StudentProfile from "../components/Login_&_Status/StudentProfile";
import { useParams } from "react-router-dom";
import axios from "axios";

const StudentOptions = () => {

    const { applicationId } = useParams();
    const [isApplyForSchemeOpen, setApplyForSchemeOpen] = useState(false);
    const [isManageProfileOpen, setManageProfileOpen] = useState(true);
    const [isViewApplicantStatusOpen, setViewApplicantStatusOpen] = useState(false);
    const [schemes,setSchemes] = useState([]);
    const [appliedSchemes,setAppliedSchemes] = useState([]);

    const ApplyForSchemes = () => {
        setApplyForSchemeOpen(true);
        setManageProfileOpen(false);
        setViewApplicantStatusOpen(false);
    };
    const ManageProfile = () => {
        setApplyForSchemeOpen(false);
        setManageProfileOpen(true);
        setViewApplicantStatusOpen(false);
    };
    const ViewApplicantStatus = () => {
        setApplyForSchemeOpen(false);
        setManageProfileOpen(false);
        setViewApplicantStatusOpen(true);
    };

    const [profile, setProfile] = useState({
        appId: applicationId,
        aadhaar_no: "",
        virtual_id: "",
        name: "",
        dob: "",
        gender: "",
        address: "",
        mobile_no: "",
        email: "",
      });
    
      useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.post(`http://localhost:4000/aadhaar/get-student-profile`, { appId: applicationId });
            const name = response.data.first_name + " " + response.data.middle_name + " " + response.data.last_name;
            const setProfileData = {
                appId : applicationId,
                aadhaar_no : response.data.aadhar_no,
                virtual_id : response.data.virtual_id,
                name : name,
                dob : response.data.dob,
                gender : response.data.gender,
                address : response.data.address,
                mobile_no : response.data.phone_no,
                email : response.data.email_id,
            }
            setProfile(setProfileData);
          } catch (error) {
            console.error("Error fetching profile:", error);
          }
        };

        const fetchSchemes = async () => {
            try {
              const response = await axios.get("http://localhost:4000/student/get-all-schemes-from-isp");
              setSchemes(response.data);
            } catch (error) {
              console.error("Error fetching schemes:", error);
            }
          };

        const fetchAppliedSchemes = async () => {
            try {
                const response = await axios.post("http://localhost:4000/student/get-applied-schemes", { appId: applicationId });
                console.log(response.data);
                setAppliedSchemes(response.data);
            } catch(error) {
                console.error("Error fetching applied schemes: ",error);
            }
        }
    
        fetchData();
        fetchSchemes();
        fetchAppliedSchemes();
      }, []);
    
      const handleAddressChange = (event) => {
        setProfile({ ...profile, address: event.target.value });
      };
    
      const handleMobileChange = (event) => {
        setProfile({ ...profile, mobile_no: event.target.value });
      };
    
      const handleEmailChange = (event) => {
        setProfile({ ...profile, email: event.target.value });
      };
    
      const handleSaveChanges = async () => {
        try {
          const response = await axios.post("http://localhost:4000/aadhaar/update-profile", profile);
          alert(response.data.message);
        } catch (error) {
          console.error("Error saving profile changes:", error);
        }
      };

    return (
        <>
            <Header />
            <div className="p-4" style={{ fontFamily: 'Cambria, serif', display: 'flex', gap: '10px' }}>
                <div>
                <StudentOptionsForm 
                    isApplyForSchemeOpen={isApplyForSchemeOpen}
                    isManageProfileOpen={isManageProfileOpen}
                    isViewApplicantStatusOpen={isViewApplicantStatusOpen}
                    ApplyForSchemes={ApplyForSchemes}
                    ManageProfile={ManageProfile}
                    ViewApplicantStatus={ViewApplicantStatus}
                />
                </div>
                {isManageProfileOpen && <div className="container card-form shadow mt-0 p-2" style={{ fontFamily: 'Cambria, serif' }}>
                    <div className="card-body bg-white">
                        <p className="text-center themeFontcolor" style={{ fontSize: "20px", backgroundColor: "#115a87", color: "#fff", padding: "20px" }}>
                            <strong>Manage Your Profile</strong>
                        </p>
                        <hr />
                        <StudentProfile
                            profile={profile}
                            handleAddressChange={handleAddressChange}
                            handleMobileChange={handleMobileChange}
                            handleEmailChange={handleEmailChange}
                            handleSaveChanges={handleSaveChanges}
                        /> 
                    </div>
                </div>}
                {isViewApplicantStatusOpen && <div className="container card-form shadow mt-4 p-4" style={{ fontFamily: 'Cambria, serif' }}>
            <div className="card-body bg-white">
                <p className="text-center themeFontcolor" style={{ fontSize: "20px", backgroundColor: "#115a87", color: "#fff", padding: "20px" }}>
                    <strong>Check Your Scholarship Status</strong>
                </p>
                <hr />
                <ScholarshipStatus 
                    appliedSchemes={appliedSchemes}/>
            </div>
        </div>}
        {isApplyForSchemeOpen && <div className="container card-form shadow mt-4 p-4" style={{ fontFamily: 'Cambria, serif' }}>
            <div className="card-body bg-white">
                <p className="text-center themeFontcolor" style={{ fontSize: "20px", backgroundColor: "#115a87", color: "#fff", padding: "20px" }}>
                    <strong>Apply For Schemes</strong>
                </p>
                <hr />
                <ApplyForScholarship 
                    appId={applicationId}
                    schemes={schemes}
                />
            </div>
        </div>}

            </div>
            
        </>
    );
}

export default StudentOptions;
