import React from "react";
import "../Scholarship/OrgOptionsForm.css";
const OrgOptionsForm = ({ 
    isManageSchemeOpen, 
    isRegisterSchemeOpen, 
    isViewApplicationOpen, 
    ManageSchemes, 
    RegisterSchemes, 
    ViewApplication 
}) => {
    return (
        <div className="sidebar">
            <button onClick={ManageSchemes} disabled={isManageSchemeOpen}>Manage Schemes</button>
            <button onClick={RegisterSchemes} disabled={isRegisterSchemeOpen}>Register Scheme</button>
            <button onClick={ViewApplication} disabled={isViewApplicationOpen}>View Application List</button>
        </div>
    );
}

export default OrgOptionsForm;
