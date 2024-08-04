import express from "express";
import db from "../config.js";  // Ensure this import is necessary
import {registerApplicant} from "../services/applicantReg.js";

const applicantRoute = express.Router();

// Middleware to parse JSON bodies
applicantRoute.use(express.json());

// Route to register an institute
applicantRoute.post("/register-applicant", registerApplicant);

export default applicantRoute;
