import express from "express";
// import * as studentService from "../services/studentRegistrationService.js";
// import { getAllSchemes } from "../services/poRegistrationService";
import { registerStudent, getAllSchemes, applyScheme, getAppliedSchemes, removeAppliedScheme } from "../services/studentRegistrationService.js";

const studentRoute = express.Router();

studentRoute.use(express.json());

// studentRoute.post("/register-student", studentService.registerStudent);      //to register student.
studentRoute.post("/register-student", registerStudent);      //to register student.

studentRoute.get("/get-all-schemes-from-isp", getAllSchemes);     //Get all schemes for applicant to register to.

studentRoute.post("/apply-scheme", applyScheme);     //apply scheme.

studentRoute.post("/get-applied-schemes", getAppliedSchemes);     //get applied schemes.

studentRoute.post("/remove-applied-scheme", removeAppliedScheme);      //remove applied scheme.

export default studentRoute;