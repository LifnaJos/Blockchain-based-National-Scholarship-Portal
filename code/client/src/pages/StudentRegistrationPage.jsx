import React from "react";
import Header from "../components/Header/Header";
import StudentAadhaarForm from "../components/Scholarship/AadhaarForm";

const StudentRegistrationForm = () => {

    return (
    <>
        <Header />
        <div className="container card-form shadow mt-4 p-4" style={{ fontFamily: 'Cambria, serif' }}>
            <div className="card-body bg-white">
                <p className="text-center themeFontcolor" style={{ fontSize: "20px", backgroundColor: "#115a87", color: "#fff", padding: "20px" }}>
                    <strong>Student Registration</strong>
                </p>
                <hr />
                <StudentAadhaarForm />
            </div>
        </div>
    </>
    );
}

export default StudentRegistrationForm;;