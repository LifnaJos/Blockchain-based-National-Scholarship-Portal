import express from "express";
import db from "../config.js";
import * as eduService from "../services/eduRegistrationService.js"; // Ensure this file exists and has the appropriate functions
import { verifyPAN, verifyTAN, verifyHEI_id } from "../services/checkServices.js"; // Make sure these verification functions are correctly implemented

const eduRoute = express.Router();

eduRoute.use(express.json());

// Route to register an educational institute
eduRoute.post("/register-institute", eduService.registerInstitute); 

// // Route to verify PAN number
// eduRoute.post("/verify-pan", verifyPAN);

// // Route to verify TAN number
// eduRoute.post("/verify-tan", verifyTAN);

// // Route to verify HEI_id
// eduRoute.post("/verify-hei-id", verifyHEI_id);

// Route to get the details of a particular institute (if needed)
eduRoute.post("/get-institute-details", eduService.getInstituteDetails);

// // Route to update institute details (if needed)
// eduRoute.post("/update-institute", eduService.updateInstitute);

// // Route to delete an institute (if needed)
// eduRoute.post("/delete-institute", eduService.deleteInstitute);

export default eduRoute;
