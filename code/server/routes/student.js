import express from "express";
import * as studentService from "../services/studentRegistrationService.js";

const studentRoute = express.Router();

studentRoute.use(express.json());

studentRoute.post("/register-student", studentService.registerStudent);      //to register student.

studentRoute.get("/get-all-schemes-from-isp", studentService.getAllSchemes);     //Get all schemes for applicant to register to.

studentRoute.post("/apply-scheme", studentService.applyScheme);     //apply scheme.

studentRoute.post("/get-applied-schemes", studentService.getAppliedSchemes);     //get applied schemes.

studentRoute.post("/remove-applied-scheme", studentService.removeAppliedScheme);      //remove applied scheme.

export default studentRoute;