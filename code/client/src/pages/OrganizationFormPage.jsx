import Header from "../components/Header/Header";
import { useNavigate } from "react-router-dom";
import OrganizationForm from "../components/Scholarship/OrganizationRegistartionForm";

function OrganizationDetailForm(){

    return (
        <>
        <Header />
        <div className="container card-form shadow mt-4 p-4" style={{ fontFamily: 'Cambria, serif' }}>
            <div className="card-body bg-white">
                <p className="text-center themeFontcolor" style={{ fontSize: "20px", backgroundColor: "#115a87", color: "#fff", padding: "20px" }}>
                    <strong>New Scheme Registration</strong>
                </p>
                <hr />
                <OrganizationForm />
            </div>
        </div>
    </>
    );
}

export default OrganizationDetailForm;