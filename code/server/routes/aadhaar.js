import express from "express";
import * as aadhaarService from "../services/checkAadhaarService.js";

const aadhaarRoute = express.Router();

aadhaarRoute.use(express.json());

aadhaarRoute.post("/verify-aadhaar", aadhaarService.verifyAadhaar);            //to verify aadhaar.

aadhaarRoute.post("/verify-appId", aadhaarService.verifyAppId);         //to verify application ID.

// aadhaarRoute.post("/get-all-schemes", aadhaarService.getAllSchemes);          //getting all registered scheme names.

aadhaarRoute.post("/get-student-profile", aadhaarService.getStudentProfile);     //get student profile details.

aadhaarRoute.post("/update-profile", aadhaarService.updateStudentProfile);      //update student profile details.

export default aadhaarRoute;
