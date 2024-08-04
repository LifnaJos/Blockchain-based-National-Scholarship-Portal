import express from "express";
import db from "../config.js";  // Ensure this import is necessary
// import * as instituteReg from "../services/instituteRegApp.js";
import {registerInstitute, getRegInstitute} from "../services/instituteRegApp.js";
import { verifyTAN, verifyRegId } from "../services/checkTanService.js"; // Uncomment if needed

const instituteRoute = express.Router();

// Middleware to parse JSON bodies
instituteRoute.use(express.json());

// Route to register an institute
instituteRoute.post("/register-institute", registerInstitute);
instituteRoute.post("/register-institute-display", getRegInstitute);

instituteRoute.post("/verify-tan", verifyTAN);             //verifying TAN.
instituteRoute.post("/verify-regId", verifyRegId);         //verifying registration ID.

export default instituteRoute;
