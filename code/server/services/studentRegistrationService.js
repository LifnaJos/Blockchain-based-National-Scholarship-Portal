import express from "express";
import db from "../config.js";
import sendEmail from "./mailer.js";

//function to register student :

export const registerStudent = async (req,res) => {
    const { input, appId } = req.body;
    console.log(req.body);

    try {
        if(input.length == 12) {                    //if input is aadhaar.

            const query1 = `INSERT INTO nsp_st_reg (aadhaar_no, app_id)
                            VALUES ($1,$2)`
            const values1 = [input,appId];
            await db.query(query1,values1);
            const virtualIdResult = await db.query(`SELECT virtual_id FROM uidai_aadhar_det WHERE aadhar_no=$1`,[input]);
            const virtualId = virtualIdResult.rows[0].virtual_id;
            await db.query(`UPDATE nsp_st_reg
                            SET virtual_id=$1
                            WHERE aadhaar_no=$2`,[virtualId,input]);      //Updates the record by putting in virtual ID.
            const responseData = {
                success: true,
                message: "Aadhaar registered successfully!",
            }
            res.status(200).json(responseData);
        } else if (input.length == 16){             //if input is virtual ID.
            const query2 = `INSERT INTO nsp_st_reg (virtual_id, app_id)
                            VALUES ($1,$2)`
            const values2 = [input,appId];
            await db.query(query2,values2);
            const aadhaarNoResult = await db.query(`SELECT aadhar_no FROM uidai_aadhar_det WHERE virtual_id=$1`,[input]);
            const aadhaarNo = aadhaarNoResult.rows[0].aadhar_no;
            await db.query(`UPDATE nsp_st_reg
                            SET aadhaar_no=$1
                            WHERE virtual_id=$2`,[aadhaarNo,input]);      //Updates the record by putting in aadhaar number.
            const responseData = {
                success: true,
                message: "Virtual ID registered successfully!",
            }
            res.status(200).json(responseData);
        }
    } catch(error) {
        res.status(500).json({ error: "Error registering student "});
    }
}

export const getAllSchemes = async (req,res) => {
    try {
        const schemes = await db.query(`SELECT nsp_po_sch."sch_id", nsp_po_sch."sch_name", nsp_po_sch."income_criteria", nsp_po_sch."age_limit", nsp_po_sch."field_of_study", nsp_po_sch."hsc_score", nsp_po_sch."ssc_score", nsp_po_sch."religion", nsp_po_sch."caste", nsp_po_sch."start_date", nsp_po_sch."end_date", nsp_po_sch."official_url", nsp_po_sch."guidelines", 
            nsp_po_fin_det."sch_org_name", nsp_po_fin_det."scholarship_amount", nsp_po_fin_det."academic_year"
            FROM nsp_po_sch  INNER JOIN nsp_po_fin_det 
            ON nsp_po_sch."reg_id" = nsp_po_fin_det."reg_id"`);

        if(schemes.rows.length === 0) {
            res.status(404).json({message: "404,Schemes not found!"});
        } else{
            res.status(200).json(schemes.rows); 
        }
    } catch(error) {
        console.error("Error getting all schemes: ",error);
        res.status(500).json({message: "Internal Server Error!"});
    }
}


export const applyScheme = async(req,res) => {
    const { appId, schemeId, schemeName } = req.body;
    const to = "2022.kushl.alve@ves.ac.in";
    const subject = "Intelligent Scholarship Portal";
    const text = "Ronaldo > MEssi";
    try {
        const alreadyApplied = await db.query(`SELECT * FROM nsp_st_sch WHERE app_id=$1 and sch_id=$2`,[appId,schemeId]);
        if(alreadyApplied.rows.length !== 0) {
            res.status(200).json({ success: false, message: "Already applied! Wait for approval."});
        } else {
            const result = await db.query(`INSERT INTO nsp_st_sch (app_id,sch_id,applied,approved,disbursed,sch_name) VALUES($1,$2,$3,$4,$5,$6)`,[appId,schemeId,true,false,false,schemeName]);
            if (result.rowCount !==0) {
                const mail = await sendEmail(to,subject,text);
                res.status(200).json({ success: true, message: "Applied successfully! Wait for approval on email."});
            } else {
                res.status(200).json({ success: false, message: "Application not successfull! Try again later."});
            }
        }
    } catch(error) {
        console.error("Error applying for scheme: ",error);
        res.status(500).json({message: "Internal server error!"});
    }
}

export const getAppliedSchemes = async (req,res) => {
    const { appId } = req.body;
    try {
        const appliedSchemes = await db.query(`SELECT DISTINCT sch_id, sch_name, applied, approved, disbursed FROM nsp_st_sch WHERE app_id=$1`,[appId]);
        res.status(200).json(appliedSchemes.rows);
    } catch(error) {
        console.error("Error getting applied schemes: ",error);
        res.status(500).json({message: "Internal server error!"});
    }
}

export const removeAppliedScheme = async(req,res) => {
    const { appId, schemeId } =req.body;
    try {
        const removedSchemes = await db.query(`DELETE FROM nsp_st_sch WHERE app_id=$1 and sch_id=$2`,[appId,schemeId]);
        if (removedSchemes.rowCount !== 0) {
            res.status(200).json({ success: true, message: "Scheme removed from application successfully!"});
        } else {
            res.status(200).json({ success: false, message: "Scheme removal failed!"});
        }
    } catch (error) {
        console.error("Error removing applied scheme: ",error);
        res.status(500).json({message: "Internal server error!"});
    }
}

// export { registerStudent, getAllSchemes, applyScheme, getAppliedSchemes, removeAppliedScheme };
