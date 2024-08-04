import express from "express";
import db from "../config.js";
import axios from "axios";


export const registerApplicant = async (req, res) => {
    const {appId, aname, dob, mobileNo, address, ifsc, panCard, incomeAmount, incomeCertificate, digilockerQr, aadharNo} = req.body;

    console.log("Received request body:", req.body);

    if (!appId || !aname || !ifsc || !dob || !panCard || !mobileNo || !incomeAmount || !address || !incomeCertificate || !digilockerQr || !aadharNo) {
        console.error("Missing fields in request body");
        return res.status(400).json({ error: "Bad Request. Missing required fields." });
    }

    try {
        const query = 'INSERT INTO applicant_reg ("Applicant_id", "Applicant_name", "Date_of_birth", "Mobile_no", "Address", "ifsc", "Pan_card", "Annual_income", "Income_certificate", "Digilocker_Qr", "Aadhar_status", "Aadhar_no") VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)';
        const values = [appId, aname, dob, mobileNo, address, ifsc, panCard, incomeAmount, incomeCertificate, digilockerQr, 1, aadharNo];
        
        console.log("Values to be inserted:", values);
 
        const result = await db.query(query, values);

        console.log(`Inserted row with values: ${values}`);

        res.status(200).json({ success: true, message: "Applicant registered successfully!" });
    } catch (error) {
        console.error("Error registering applicant:", error);
        res.status(500).json({ error: "Internal server error." }); 
    }    
};

