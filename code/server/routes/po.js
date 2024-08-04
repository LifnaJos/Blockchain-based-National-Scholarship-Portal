import express from "express";
import db from "../config.js";
// import * as poService from "../services/poRegistrationService.js";
import {registerPO, registerScheme, getAllSchemes, getScheme, deleteScheme, updateScheme, getRegScheme} from "../services/poRegistrationService.js"
// getApplicants 
// import {registerPO, registerScheme} from "../services/poRegistrationService.js"

import {verifyTAN , verifyRegId } from "../services/checkTanService.js";

const poRoute = express.Router();

poRoute.use(express.json());

poRoute.post("/register-po", registerPO);      //registering private organisation.

poRoute.post("/verify-tan", verifyTAN);             //verifying TAN.

poRoute.post("/verify-regId", verifyRegId);         //verifying registration ID.

poRoute.post("/scheme-form", registerScheme);          //to enter scheme details into database.

poRoute.post("/get-all-schemes", getAllSchemes);        //to get all schemes related to that organization.

poRoute.post("/get-scheme", getScheme);      //to get a scheme with particular schemeId and regId.

poRoute.post("/delete-scheme", deleteScheme);      //to delete a scheme. 

poRoute.post("/update-scheme", updateScheme);      //to update a scheme. 

poRoute.post("/display-scheme", getRegScheme)

// poRoute.post("/get-approved-applicants", getApplicants);     //to get approved applicants for final disbursement.

export default poRoute;