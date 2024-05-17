import Header from "../Header/Header";
import { useNavigate } from "react-router-dom";
import StudentForm from "./StudentFormDesign";

function StudentDetailForm(){

    return (
        <>
        <Header />
        <div className="container card-form shadow mt-4 p-4" style={{ fontFamily: 'Cambria, serif' }}>
            <div className="card-body bg-white">
                <p className="text-center themeFontcolor" style={{ fontSize: "20px", backgroundColor: "#115a87", color: "#fff", padding: "20px" }}>
                    <strong>Intelligent Scholarship Portal 2023-24 - Student Registration / Detail form</strong>
                </p>
                <hr />
                <StudentForm />
            </div>
        </div>
    </>
    );
}

export default StudentDetailForm;