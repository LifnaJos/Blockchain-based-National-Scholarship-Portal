import React, { useState } from "react";
import { Link } from "react-router-dom";

function ContinueButton({ destination, isButtonEnabled }) {
    return (
    <div className="col-sm-12" style={{ textAlign: "center" }}>
        <button type="button" className={`btn btn-success`} disabled={!isButtonEnabled}>
        <Link style={{ textDecoration: "none", color: "white" }} to={destination}>
            Continue...
        </Link>
        </button>
    </div>
    );
}

function GeneralInstructions({ instructionsList, buttonDestination, otherInstructionsList, undertakingItems }) {

    const [checkboxStatus, setCheckboxStatus] = useState(Array(undertakingItems.length).fill(false));

    const handleCheckboxChange = (index) => {
        const updatedCheckboxStatus = [...checkboxStatus];
        updatedCheckboxStatus[index] = !updatedCheckboxStatus[index];
        setCheckboxStatus(updatedCheckboxStatus);
    };

    const isButtonEnabled = checkboxStatus.every((status) => status);

    return (
        <div className="container card-form shadow mt-4 p-4" style={{ fontFamily: 'Cambria, serif' }}>
            <div className="card-body bg-white">
                <p className="text-center themeFontcolor" style={{ fontSize: "20px", color: "#0350dd" }}>
                    <strong>Academic Year 2023-24 <br /> Guidelines for Registration on Intelligent Scholarship Portal</strong>
                </p>
                <hr />
                <h5 className="text-justify">
                    <strong>General Instruction / Guidelines</strong>
                </h5>
                <ol style={{ fontSize: "17px" }}>
                    {instructionsList.map((instruction, index) => (
                        <li key={index} dangerouslySetInnerHTML={{ __html: instruction }}></li>
                    ))}
                </ol>
                <h5 className="text-justify">
                    <strong>Other Instructions / Guidelines</strong>
                </h5>
                <ol style={{ fontSize: '17px' }}>
                    {otherInstructionsList.map((otherInstruction, index) => (
                        <li key={index}>
                            <span style={{ fontWeight: "bold" }}>{otherInstruction.label}</span>: {otherInstruction.text}
                        </li>
                    ))}
                </ol>
                <hr />
                <p className="text-center text-danger themeFontcolor" style={{ fontSize: "20px", textDecoration: "underline" }}>
                    <strong>Undertaking Form</strong>
                </p>
                <ol style={{ listStyleType: 'none', fontSize: '17px' }}>
                    <b>I agree to the following: /मैं निम्नलिखित के लिए सहमत हूँ</b>
                    {undertakingItems.map((item, index) => (
                        <li key={index}>
                            <input type="checkbox" onChange={() => handleCheckboxChange(index)} checked={checkboxStatus[index]} />{" "}
                            {item.text}
                        </li>
                    ))}
                </ol>
                <ContinueButton destination={buttonDestination} isButtonEnabled={isButtonEnabled} />
            </div>
        </div>
    );
}

export default GeneralInstructions;
