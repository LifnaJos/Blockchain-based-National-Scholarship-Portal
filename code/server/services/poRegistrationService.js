import express from "express";
import db from "../config.js";
import axios from "axios";

export const registerPO = async (req,res) =>  {
    const { tan, regId } = req.body;
    console.log(req.body);  
    try {
        const query = `INSERT INTO nsp_po_reg (tan, reg_id ) VALUES ($1,$2)`;
        const values = [tan, regId];
        const result = await db.query(query,values);
        
        const registeredPO = result.rows;

        if(registeredPO.length!=0) {
            res.status(200).json({ success: true});
        } else {
            res.status(200).json({ success: false });
        }
    } catch (error) {
        console.error("Error registering organisation:", error);
        res.status(500).json({ error: "Internal server error." });
    }
}

export const registerScheme = async (req,res) => {
    const {regId,scholarship_name,income_criteria,age_limit,field_of_study,hsc_score,ssc_score,religion,caste,starts_on,ends_on,official_url,guidelines,schemeId,_12AA_registered_no, sch_org_name, scholarship_amount, academic_year} = req.body;
    

    console.log(req.body);

    try {
        //registering scheme into nsp_po_sch table.
        const query1 = `INSERT INTO nsp_po_sch VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14)`;
        const values1 = [regId,schemeId,scholarship_name,income_criteria, age_limit, field_of_study, hsc_score, ssc_score, religion, caste, starts_on, ends_on, official_url, guidelines];
        const result1 = await db.query(query1,values1);

        //registering financial details of organization into nsp_po_fin_det table.
        const query2 = `INSERT INTO nsp_po_fin_det VALUES($1,$2,$3,$4,$5,$6)`;
        const values2 = [ _12AA_registered_no, sch_org_name,scholarship_amount,academic_year,schemeId,regId];
        const result2 = await db.query(query2,values2);

        if(result1.rows.length !== 0 && result2.rows.length !==0) {
            const responseData = {
                success: true,
                message: "Scheme registered successfully! Note your scheme ID."
            }
            res.status(200).json(responseData);
        } else {
            const responseData = {
                success: false,
                message: "Scheme registration failed!"
            }
            res.status(200).json(responseData);
        }

    } catch(error) {
        console.error("Error registering scheme:",error);
        res.status(500).json(error);
    }
}

export const getAllSchemes = async (req,res) => {
    const { regId } = req.body;
    // console.log(regId);
    try {
        const result = await db.query(`SELECT sch_id, sch_name FROM nsp_po_sch WHERE reg_id = $1`, [regId]);
        const schemes = result.rows.map(row => ({
            schemeId: row.sch_id,
            schemeName: row.sch_name
        }));

        if(schemes.length != 0) {
            res.status(200).send(schemes);
        } else {
            res.status(200).json({message : "No current schemes registered."});
        }
    } catch(error) {
        console.error("Error getting all schemes:", error);
        res.status(500).json({message: "Internal server error!"});
    }
}

export const getScheme = async(req,res) => {
    const { regId, schemeId } = req.body;
    try {
        const schemeDetails = await db.query(`SELECT reg_id,sch_id,sch_name,income_criteria, age_limit, field_of_study, hsc_score, ssc_score, religion, caste, start_date, end_date, official_url, guidelines FROM nsp_po_sch WHERE reg_id=$1 and sch_id=$2`,[regId,schemeId]);
        const finDetails = await db.query(`SELECT _12AA_registered_no, sch_org_name, scholarship_amount, academic_year FROM nsp_po_fin_det WHERE reg_id=$1 and sch_id=$2`, [regId,schemeId]);
        const schemeData = {
            reg_id : schemeDetails.rows[0].reg_id,
            sch_id : schemeDetails.rows[0].sch_id,
            sch_name : schemeDetails.rows[0].sch_name,
            income_criteria : schemeDetails.rows[0].income_criteria,
            age_limit : schemeDetails.rows[0].age_limit,
            field_of_study : schemeDetails.rows[0].field_of_study,
            hsc_score : schemeDetails.rows[0].hsc_score,
            ssc_score : schemeDetails.rows[0].ssc_score,
            religion : schemeDetails.rows[0].religion,
            caste : schemeDetails.rows[0].caste,
            start_date : schemeDetails.rows[0].start_date,
            end_date : schemeDetails.rows[0].end_date,
            official_url : schemeDetails.rows[0].official_url,
            guidelines : schemeDetails.rows[0].guidelines,
            _12aa_registered_no : finDetails.rows[0]._12aa_registered_no,
            sch_org_name : finDetails.rows[0].sch_org_name,
            scholarship_amount :  finDetails.rows[0].scholarship_amount,
            academic_year : finDetails.rows[0].academic_year,
        };
        res.status(200).json(schemeData);
    } catch(error) {
        console.error("Error getting scheme:",error);
        res.status(500).json({message: "Internal server error!"});
    }
}

export const deleteScheme = async(req,res) => {
    const { schemeId } = req.body;
    try {
        const result1 = await db.query(`DELETE FROM nsp_po_sch WHERE sch_id=$1`,[schemeId]);
        const result2 = await db.query(`DELETE FROM nsp_po_fin_det WHERE sch_id=$1`,[schemeId]);

        if (result1.rows.length !==0 && result2.rows.length !==0) {
            res.status(200).json({ success: false, message: "Scheme deletion failed!"});
        } else {
            res.status(200).json({ success: true, message: "Scheme deleted successfully!"});
        }
    } catch(error) {
        console.error("Error deleting a scheme:",error);
        res.status(500).json({message: "Internal server error!"});
    }
}

export const updateScheme = async(req,res) => {
    const { regId, schemeId} = req.body;
    const { formData } = req.body;
    const { scholarship_name,income_criteria, age_limit, field_of_study, hsc_score, ssc_score, religion, caste, starts_on, ends_on, official_url, guidelines,_12AA_registered_no, sch_org_name, scholarship_amount, academic_year } = formData; 
    console.log(formData);
    try {
        const query1 = `UPDATE nsp_po_sch 
        SET 
            sch_name = $1,
            income_criteria = $2,
            age_limit = $3,
            field_of_study = $4,
            hsc_score = $5,
            ssc_score = $6,
            religion = $7,
            caste = $8
            start_date = $9,
            end_date = $10,
            official_url = $11
            guidelines = $12
        WHERE 
            reg_id = $13
            AND sch_id = $14;
        `
        
        const values1 = [scholarship_name,income_criteria, age_limit, field_of_study, hsc_score, ssc_score, religion, caste, starts_on, ends_on, official_url, guidelines,regId,schemeId]
        const result1 = await db.query(query1,values1);

        const query2 = `UPDATE nsp_po_fin_det 
        SET 
            _12AA_registered_no = $1, 
            sch_org_name = $2, 
            scholarship_amount = $3, 
            academic_year = $4
        WHERE 
            reg_id = $5 
            AND sch_id = $6;
        `
        const values2 = [_12AA_registered_no, sch_org_name, scholarship_amount, academic_year,regId,schemeId]
        const result2 = await db.query(query2,values2);

        if (result1.rows.length != 0 && result2.rows.length != 0) {
            res.status(200).json({ success: true,
            message: "Scheme updated successfully!"});
        } else {
            res.status(200).json({ success: false,
            message: "Scheme updation failed!"});
        }
    } catch(error) {
        console.error("Error updating scheme:",error);
        res.status(500).json({message: "Internal Server Error"});
    }
}

// export const getApplicants = async(req,res) => {
//     const { regId } = req.body;
//     try {
//         const schemeIdsResponse = await db.query(`SELECT DISTINCT sch_id FROM nsp_po_sch WHERE reg_id = $1`, [regId]);
//         const schemeIds = schemeIdsResponse.rows.map(row => row.sch_id);
        
//         const result = await db.query(`SELECT * FROM nsp_st_sch WHERE applied = $1 AND approved = $2 AND disbursed = $3 AND sch_id = ANY($4)`, [true, true, false, schemeIds]);
//         console.log(result.rows); 
//     } catch(error) {
//         console.error("Error getting applicants:",error);
//         res.status(500).json({message: "Internal Server Error"});
//     }
// }

export const getRegScheme = async (req,res) => {
    const { schemeId } = req.body;
    // console.log(regId);
    try {
        const result1 = await db.query(`SELECT reg_id, sch_id, sch_name, income_criteria, age_limit, filed_of_study, hsc_Score, ssc_Score, religion, caste, start_date, end_date, official_url, guidelinies FROM nsp_St_regg WHERE sch_id = $1`, [schemeId]);
        const result2 = await db.query(`SELECT _12AA_registered_no, sch_org_name, scholarship_amount, academic_year FROM nsp_po_fin_det WHERE sch_id = $1`, [schemeId]);
        
        // const dataDisplay = result.rows.map(row => ({
        //     regId: row.reg_no,
        //     mobNum: row.mobile_number,
        //     email: row.email,
        //     collegeName: row.college_name,
        //     address: row.address,   
        //     city: row.city,
        //     state: row.state
        // }));

        // console.log(result1);
        // console.log(result2)

        // if(dataDisplay.length != 0) {
        //     res.status(200).send(dataDisplay);
        // } else {
        //     res.status(200).json({message : "Institute not found"});
        // }
    } catch(error) {
        console.error("Error fetching scheme details:", error);
        res.status(500).json({message: "Internal server error!"});
    }
}

// // export {registerPO, registerScheme, getAllSchemes, getScheme, updateScheme, deleteScheme, getApplicants};