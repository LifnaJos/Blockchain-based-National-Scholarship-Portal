import React from "react";
import "../Scholarship/OrgOptionsForm.css";
import ApplyForSchemes from "./ApplyForSchemes";
const StudentOptionsForm = ({ 
    isApplyForSchemeOpen, 
    isManageProfileOpen, 
    isViewApplicantStatusOpen, 
    ApplyForSchemes, 
    ManageProfile, 
    ViewApplicantStatus 
}) => {
    return (
        <div className="sidebar">
            <button onClick={ApplyForSchemes} disabled={isApplyForSchemeOpen}>Apply For Schemes</button>
            <button onClick={ManageProfile} disabled={isManageProfileOpen}>Manage Your Profile</button>
            <button onClick={ViewApplicantStatus} disabled={isViewApplicantStatusOpen}>View Applicant Status</button>
        </div>
    );
}

export default StudentOptionsForm;
