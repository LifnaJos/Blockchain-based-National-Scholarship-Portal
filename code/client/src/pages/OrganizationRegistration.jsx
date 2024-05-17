import React from "react";
import Header from "../components/Header/Header";
import OrganizationTanInput from "../components/Scholarship/TANForm";

function OrganizationRegistration() {
    return <div>
        <Header />
        <div className="container card-form shadow mt-4 p-4" style={{ fontFamily: 'Cambria, serif' }}>
            <div className="card-body bg-white">
            <p className="text-center themeFontcolor" style={{ fontSize: "20px", backgroundColor: "#115a87", color: "#fff", padding: "20px" }}>
                <strong>Organization Registration</strong>
            </p>
            <hr />
            <OrganizationTanInput />
            </div>
        </div>
    </div>;
}

export default OrganizationRegistration;