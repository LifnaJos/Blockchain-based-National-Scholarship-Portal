import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Loading from "./Loading"; // Import the loading component
import Home from "./components/Home/Home";
import {StudentRegistrationGuidelines, OrganizationRegistrationGuidelines, InstituteRegistrationGuidelines} from "./components/Scholarship/NewRegistrationPage";
import StudentRegistrationForm from "./pages/StudentRegistrationPage";
import OrganizationRegistration from "./pages/OrganizationRegistration";
import StudentLogin from "./components/Login_&_Status/StudentLogin";
import StudentApplicationSchemeInfo from "./components/Login_&_Status/StudentApplicationSchemeInfo";
import StudentDetailForm from "./pages/StudentDetailFormPage";
import InstituteLogin from "./components/Login_&_Status/InstituteLogin"
import StudentListForInstitute from "./components/Login_&_Status/StudentListInstitute";
import OrganizationDetailForm from "./pages/OrganizationFormPage";
import OrganizationLogin from "./components/Login_&_Status/OrganizationLogin";
import OrganizationTable from "./components/Login_&_Status/StudentOrganizationTable";
import OrgOptions from "./pages/OrganisationOptionsPage";
import StudentOptions from "./pages/StudentOptionsPage";
import EditScheme from "./pages/OrganisationEditSchemePage";
import ApplyScheme from "./pages/StudentApplySchemePage";
import InstituteRegistrationPage from "./pages/InstituteRegistrationPage";
import InstituteDetailForm from "./pages/InstituteDetailFormPage";
import InstituteApplicationForm from "./pages/InstituteApplicationForm";
import ApplicantApplicationForm from "./pages/ApplicantApplicationForm"
import DisplayScholarshipScheme from "./pages/DisplayScheme";

function App() {
    const [loading, setLoading] = useState(true);

    // Simulate loading delay (replace this with your actual loading logic)
    setTimeout(() => {
        setLoading(false);
    }, 3000);

    return (
        <div>
            {loading ? (
                <Loading /> // Render the loading component if loading state is true
            ) : (
                <Routes>
                    <Route path="/" element={<Home />} /> 
                    <Route path="/registration-student" element={<StudentRegistrationGuidelines />} />
                    <Route path="/student-registration" element={<StudentRegistrationForm />} />
                    <Route path="/registration-organization" element={<OrganizationRegistrationGuidelines />} />
                    <Route path="/organization-registration" element={<OrganizationRegistration />} />
                    <Route path="/student-login" element={<StudentLogin />} />
                    <Route path="/student-application-Info" element={<StudentApplicationSchemeInfo />} />
                    <Route path="/student-information-form" element={<StudentDetailForm />} />
                    <Route path="/institute-login" element={<InstituteLogin />} />
                    <Route path="/student-list-for-verification" element={<StudentListForInstitute />} />
                    <Route path="/organization-form" element={<OrganizationDetailForm />} />
                    <Route path="/organization-login" element={<OrganizationLogin />} />
                    <Route path="/organization-table" element={<OrganizationTable />} />
                    <Route path="/organization-options/regId/:registrationId" element={<OrgOptions />} />
                    <Route path="/student-options/:applicationId" element={<StudentOptions />} />
                    <Route path="/edit-scheme/regId/:registrationId/schemeId/:schemeId" element={<EditScheme />} />
                    <Route path="/apply-scheme/schemeId/:schemeId/appId/:appId" element={<ApplyScheme />}></Route>
                    <Route path="/institute-register" element={<InstituteRegistrationPage/>} />
                    <Route path="/registration-institute" element={<InstituteRegistrationGuidelines />} />
                    <Route path="/institute-detail" element={<InstituteDetailForm />} />
                    <Route path="/institute-application" element={<InstituteApplicationForm />} />
                    <Route path="/applicant-registration" element={<ApplicantApplicationForm />}></Route>
                    <Route path="/scholarship-displayScheme" element={<DisplayScholarshipScheme/>}></Route>
                </Routes>
            )}
        </div>
    );
}

export default App;
