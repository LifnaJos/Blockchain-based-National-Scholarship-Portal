import express from "express";
import db from "../config.js";
import * as poService from "../services/poRegistrationService.js";
import {verifyTAN , verifyRegId } from "../services/checkTanService.js";

const poRoute = express.Router();

poRoute.use(express.json());

poRoute.post("/register-po", poService.registerPO);      //registering private organisation.

poRoute.post("/verify-tan", verifyTAN);             //verifying TAN.

poRoute.post("/verify-regId", verifyRegId);         //verifying registration ID.

poRoute.post("/scheme-form", poService.registerScheme);          //to enter scheme details into database.

poRoute.post("/get-all-schemes", poService.getAllSchemes);        //to get all schemes related to that organization.

poRoute.post("/get-scheme", poService.getScheme);      //to get a scheme with particular schemeId and regId.

poRoute.post("/delete-scheme", poService.deleteScheme);      //to delete a scheme. 

poRoute.post("/update-scheme", poService.updateScheme);      //to update a scheme. 

// poRoute.post("/get-approved-applicants", poService.getApplicants);     //to get approved applicants for final disbursement.

export default poRoute;