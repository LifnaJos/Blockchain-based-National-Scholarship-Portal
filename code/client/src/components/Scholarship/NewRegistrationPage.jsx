import React from "react";
import GeneralInstructions from "./Registration-Funtions";
import {
StudentInstructionsList,
OrganizationInstructionsList,
StudentOtherInstructionsList,
OrganizationOtherInstructionsList,
StudentUndertaking,
OrganizationUndertaking
} from "./ScholarshipData";
import Header from "../Header/Header";

function StudentRegistrationGuidelines() {
    return (
    <div>
    <Header />
    <GeneralInstructions
        instructionsList={StudentInstructionsList}
        otherInstructionsList={StudentOtherInstructionsList}
        undertakingItems={StudentUndertaking}
        buttonDestination="/student-registration"
    />
    </div>
    );
}

function OrganizationRegistrationGuidelines() {
    return (
    <div>
    <Header />
    <GeneralInstructions
        instructionsList={OrganizationInstructionsList}
        otherInstructionsList={OrganizationOtherInstructionsList}
        undertakingItems={OrganizationUndertaking}
        buttonDestination="/organization-registration"
    />
    </div>
    );
}

export { StudentRegistrationGuidelines, OrganizationRegistrationGuidelines };
