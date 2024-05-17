import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "../Header/Header";
import { Captcha } from "../OTP & Captcha/Captcha";

function RedStar() {
    return <span style={{ color: 'red' }}>*</span>;
}

function InstituteLogin(){
    return <>
        <Header />
        <div className="container card-form shadow mt-4 p-4" style={{ fontFamily: 'Cambria, serif' }}>
            <div className="card-body bg-white">
                <p className="text-center themeFontcolor" style={{ fontSize: "20px", backgroundColor: "#115a87", color: "#fff", padding: "20px" }}>
                    <strong>Intelligent Scholarship Portal 2023-24 - Institute / College Login</strong>
                </p>
                <hr />
                <InstituteInput />
            </div>
        </div>
    </>;
}

function InstituteInput(){

    const navigate = useNavigate();
    
    return <>
    <div className="card-form shadow p-4 mt-4">
    <div className="row">
    <div className="col-sm-5 mb-3">
        <label className="form-label">Enter Institute / College Id <RedStar /></label>
        <div className="input-group">
            <input
            type="text"
            placeholder=""
            required
            className="form-control"
            />
        </div>
    </div>
    </div>
    <div className="col-sm-2 mb-3">
        <label className="form-label">Enter Password <RedStar /></label>
        <input
        type="password"
        maxLength="6"
        className="form-control"
        />
    </div>
    <Captcha />
    <div className="col-sm-3 mb-3">
        <label className="form-label d-block">&nbsp;</label>
        <button type="button" className="btn btn-md btn-primary" onClick={() => navigate("/student-list-for-verification")}>Verify</button>
    </div>
    </div>
    </>
}

export default InstituteLogin;