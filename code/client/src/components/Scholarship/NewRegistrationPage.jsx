import React from "react";
import GeneralInstructions from "./Registration-Funtions";
import {
StudentInstructionsList,
OrganizationInstructionsList,
InstituteInstructionList,
StudentOtherInstructionsList,
OrganizationOtherInstructionsList,
InstituteOtherInstructionsList,
StudentUndertaking,
OrganizationUndertaking,
InstituteUndertaking
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

function InstituteRegistrationGuidelines() {
    return (
    <div>
    <Header />
    <GeneralInstructions
        instructionsList={InstituteInstructionList}
        otherInstructionsList={InstituteOtherInstructionsList}
        undertakingItems={InstituteUndertaking}
        buttonDestination="/institute-register"
    />
    </div>
    );
}

export { StudentRegistrationGuidelines, OrganizationRegistrationGuidelines, InstituteRegistrationGuidelines };