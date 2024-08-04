import React, { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import OrgOptionsForm from "../components/Scholarship/OrgOptionsForm";
import Header from "../components/Header/Header";
import OrganizationForm from "../components/Scholarship/OrganizationRegistartionForm";
import OrganizationTable from "../components/Login_&_Status/StudentOrganizationTable";
import ManageScheme from "../components/Scholarship/ManageSchemes";

const OrgOptions = () => {
    const [isManageSchemeOpen, setManageSchemeOpen] = useState(false);
    const [isRegisterSchemeOpen, setRegisterSchemeOpen] = useState(true);
    const [isViewApplicationOpen, setViewApplicationOpen] = useState(false);
    const {registrationId} = useParams();
    const [schemes, setSchemes] = useState([]);
    const [applicants, setApplicants] = useState([]);

    const ManageSchemes = () => {
        setManageSchemeOpen(true);
        setRegisterSchemeOpen(false);
        setViewApplicationOpen(false);
    };
    const RegisterSchemes = () => {
        setManageSchemeOpen(false);
        setRegisterSchemeOpen(true);
        setViewApplicationOpen(false);
    };
    const ViewApplication = () => {
        setManageSchemeOpen(false);
        setRegisterSchemeOpen(false);
        setViewApplicationOpen(true);
    };
   
  React.useEffect(() => {
    const fetchSchemes = async () => {
      try {
        const response = await axios.post("http://localhost:4000/po/get-all-schemes",{ regId: registrationId });
        console.log(response.data);
        setSchemes(response.data);
      } catch (error) {
        console.error("Error fetching schemes:", error);
      }
    };

    const fetchApplicants = async () => {
        try {
            const response = await axios.post("http://localhost:4000/po/get-approved-applicants", { regId: registrationId });
            setApplicants(response.data);
        } catch (error) {
            console.error("Error fetching applicants:", error);
        }
    };
    fetchSchemes();
    fetchApplicants();
  });
    return (
        <>
            <Header />
            <div className="p-4" style={{ fontFamily: 'Cambria, serif', display: 'flex', gap: '10px' }}>
                <div>
                    <OrgOptionsForm 
                        isManageSchemeOpen={isManageSchemeOpen}
                        isRegisterSchemeOpen={isRegisterSchemeOpen}
                        isViewApplicationOpen={isViewApplicationOpen}
                        ManageSchemes={ManageSchemes}
                        RegisterSchemes={RegisterSchemes}
                        ViewApplication={ViewApplication}
                    />
                </div>
                {isRegisterSchemeOpen && <div className="container card-form shadow mt-0 p-2" style={{ fontFamily: 'Cambria, serif' }}>
                    <div className="card-body bg-white">
                        <p className="text-center themeFontcolor" style={{ fontSize: "20px", backgroundColor: "#115a87", color: "#fff", padding: "20px" }}>
                            <strong>New Scheme Registration</strong>
                        </p>
                        <hr />
                        <OrganizationForm regId={registrationId}/>
                    </div>
                </div>}
                {isViewApplicationOpen && <div className="container card-form shadow mt-4 p-4" style={{ fontFamily: 'Cambria, serif' }}>
            <div className="card-body bg-white">
                <p className="text-center themeFontcolor" style={{ fontSize: "20px", backgroundColor: "#115a87", color: "#fff", padding: "20px" }}>
                    <strong>Applicant List</strong>
                </p>
                <hr />
                <OrganizationTable regId={registrationId} applicants={applicants}/>
            </div>
        </div>}
        {isManageSchemeOpen && <div className="container card-form shadow mt-4 p-4" style={{ fontFamily: 'Cambria, serif' }}>
            <div className="card-body bg-white">
                <p className="text-center themeFontcolor" style={{ fontSize: "20px", backgroundColor: "#115a87", color: "#fff", padding: "20px" }}>
                    <strong>Manage Schemes</strong>
                </p>
                <hr />
                <ManageScheme  schemes={schemes} regId={registrationId}/>
            </div>
        </div>}

            </div>
            
        </>
    );
}

export default OrgOptions;