import db from "../config.js";

//Function for only TAN verification:

const verifyTAN = async (req,res) => {
    try {
        const { tan } = req.body;
        console.log(tan);
        //Checking if TAN is valid or not: (checking from itd_tan_det table)
        const validTan = await db.query(`SELECT * FROM itd_tan_det WHERE tan=$1`,[tan]);
        
        if(validTan.rows.length != 0) {  //if it is valid.
             //Checking if organisation is already registered or not: 
            const existingTan = await db.query(`SELECT * FROM nsp_po_reg WHERE tan=$1`,[tan]);

            if (existingTan.rows.length === 0) {
                const responseData = {
                    success: true,
                    message: "TAN verification successful!",
                };
                res.status(200).json(responseData);       
            } else {
                const responseData = {
                    success: false,
                    message: "TAN already registered! Please go to login page.",
                }
                res.status(200).json(responseData);
            }
        }
        else {  //if it is invalid.
            const responseData = {
                success: false,
                message: "TAN verification failed!",
            }
            res.status(200).json(responseData);   
        }
    } catch (error) {
            console.error("Error logging in for organisation:", error);
            res.status(500).json({ error: "Internal server error." });
    }
}

//Function for registration ID verification:

const verifyRegId = async (req,res) => {
    try {
        const { registrationId } = req.body;
        console.log(registrationId);
        //Checking if organisation is already registered or not: 
        const existingRegId = await db.query(`SELECT * FROM nsp_po_reg WHERE reg_id=$1`,[registrationId]);

        if (existingRegId.rows.length === 0) {
            const responseData = {
                success: false,
                message: "Registration ID verification failed!",
            };
            res.status(200).json(responseData);       
        } else {
            const responseData = {
                success: true,
                message: "Registration ID verification successfull!",
            }
            res.status(200).json(responseData);
        }
    } catch (error) {
        console.error("Error logging in for organisation:", error);
        res.status(500).json({ error: "Internal server error." });
    }
}

export {verifyRegId, verifyTAN};