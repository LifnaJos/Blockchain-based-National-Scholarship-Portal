import express from "express";
import db from "../config.js";
import axios from "axios"; // Ensure this is needed or remove if unused

const router = express.Router();

export const registerInstitute = async (req, res) => {
    const { heid, pan, tan, email, collegeName, address, city, state, mobNum, appId } = req.body;

    console.log(req.body);

    try {
        // Registering scheme into edu_apl_inst table
        const query = 'INSERT INTO edu_apl_inst (HEI_id, Reg_no, TAN_number, PAN_number, Mobile_number, Email, College_name, Address, City, State) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)';

        const values = [heid, appId, tan, pan, mobNum, email, collegeName, address, city, state];
        const result = await db.query(query, values);

        console.log(`Inserted row with values: ${values}`);

        res.status(200).json({ success: true, message: "Institute registered successfully!" });
    } catch (error) {
        console.error("Error registering institute:", error);
        res.status(500).json({ error: "Internal server error." }); 
    }    
};

export const getRegInstitute = async (req,res) => {
        const { appId } = req.body;
        // console.log(regId);
        try {
            const result = await db.query(`SELECT reg_no,mobile_number, email, college_name, address, city, state FROM edu_apl_inst WHERE reg_no = $1`, [appId]);
            const dataDisplay = result.rows.map(row => ({
                regId: row.reg_no,
                mobNum: row.mobile_number,
                email: row.email,
                collegeName: row.college_name,
                address: row.address,   
                city: row.city,
                state: row.state
            }));

            console.log(result);
    
            if(dataDisplay.length != 0) {
                res.status(200).send(dataDisplay);
            } else {
                res.status(200).json({message : "Institute not found"});
            }
        } catch(error) {
            console.error("Error fetching institute details:", error);
            res.status(500).json({message: "Internal server error!"});
        }
    }

    // export const getFormData = async (req, res) => {
    //     try {
    //         const result = await db.query('SELECT * FROM your_table');
    //         res.json(result.rows);
    //     } catch (err) {
    //         console.error(err.message);
    //         res.status(500).send('Server error');
    //     }
    // };


// export { registerInstitute };
