import express from "express";
import db from "../config.js";
import axios from "axios";

const registerPO = async (req,res) =>  {
    const { tan, regId } = req.body;
    console.log(req.body);
    try {
        const query = `INSERT INTO nsp_po_reg (tan, reg_id )
                        VALUES ($1,$2)`;
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

const registerScheme = async (req,res) => {
    const { regId, scholarship_name, income_criteria, field_of_study, 
    starts_on, ends_on, guidelines, schemeId,
    _12AA_registered_no, donor_name, donation_amount, date_of_donation} = req.body;

    console.log(req.body);

    try {
        //registering scheme into nsp_po_sch table.
        const query1 = `INSERT INTO nsp_po_sch VALUES($1,$2,$3,$4,$5,$6,$7,$8)`;
        const values1 = [regId,schemeId,scholarship_name,income_criteria,field_of_study,starts_on,ends_on,guidelines];
        const result1 = await db.query(query1,values1);

        //registering financial details of organization into nsp_po_fin_det table.
        const query2 = `INSERT INTO nsp_po_fin_det VALUES($1,$2,$3,$4,$5,$6)`;
        const values2 = [_12AA_registered_no,donor_name,donation_amount,date_of_donation,schemeId,regId];
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

const getAllSchemes = async (req,res) => {
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

const getScheme = async(req,res) => {
    const { regId, schemeId } = req.body;
    try {
        const schemeDetails = await db.query(`SELECT reg_id, sch_name, income_criteria, field_of_study, start_date, end_date, guidelines FROM nsp_po_sch WHERE reg_id=$1 and sch_id=$2`,[regId,schemeId]);
        const finDetails = await db.query(`SELECT _12aa_registered_no, donor_name, donation_amount, date_of_donation FROM nsp_po_fin_det WHERE reg_id=$1 and sch_id=$2`, [regId,schemeId]);
        const schemeData = {
            reg_id : schemeDetails.rows[0].reg_id,
            sch_name : schemeDetails.rows[0].sch_name,
            income_criteria : schemeDetails.rows[0].income_criteria,
            field_of_study : schemeDetails.rows[0].field_of_study,
            start_date : schemeDetails.rows[0].start_date,
            end_date : schemeDetails.rows[0].end_date,
            guidelines : schemeDetails.rows[0].guidelines,
            _12aa_registered_no : finDetails.rows[0]._12aa_registered_no,
            donor_name : finDetails.rows[0].donor_name,
            donation_amount :  finDetails.rows[0].donation_amount,
            date_of_donation : finDetails.rows[0].date_of_donation,
        };
        res.status(200).json(schemeData);
    } catch(error) {
        console.error("Error getting scheme:",error);
        res.status(500).json({message: "Internal server error!"});
    }
}

const deleteScheme = async(req,res) => {
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

const updateScheme = async(req,res) => {
    const { regId, schemeId} = req.body;
    const { formData } = req.body;
    const { scholarship_name, income_criteria, field_of_study, starts_on, ends_on, guidelines, 
            _12AA_registered_no, donor_name, donation_amount, date_of_donation } = formData; 
    console.log(formData);
    try {
        const query1 = `UPDATE nsp_po_sch 
        SET 
            sch_name = $1,
            income_criteria = $2,
            field_of_study = $3,
            start_date = $4,
            end_date = $5,
            guidelines = $6
        WHERE 
            reg_id = $7 
            AND sch_id = $8;
        `
        const values1 = [scholarship_name,income_criteria,field_of_study,starts_on,ends_on,guidelines,regId,schemeId]
        const result1 = await db.query(query1,values1);

        const query2 = `UPDATE nsp_po_fin_det 
        SET 
            _12aa_registered_no = $1,
            donor_name = $2,
            donation_amount = $3,
            date_of_donation = $4
        WHERE 
            reg_id = $5 
            AND sch_id = $6;
        `
        const values2 = [_12AA_registered_no,donor_name,donation_amount,date_of_donation,regId,schemeId]
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

const getApplicants = async(req,res) => {
    const { regId } = req.body;
    try {
        const schemeIdsResponse = await db.query(`SELECT DISTINCT sch_id FROM nsp_po_sch WHERE reg_id = $1`, [regId]);
        const schemeIds = schemeIdsResponse.rows.map(row => row.sch_id);
        
        const result = await db.query(`SELECT * FROM nsp_st_sch WHERE applied = $1 AND approved = $2 AND disbursed = $3 AND sch_id = ANY($4)`, [true, true, false, schemeIds]);
        console.log(result.rows);
    } catch(error) {
        console.error("Error getting applicants:",error);
        res.status(500).json({message: "Internal Server Error"});
    }
}

export {registerPO, registerScheme, getAllSchemes, getScheme, updateScheme, deleteScheme, getApplicants};