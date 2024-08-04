import db from "../config.js";

//Function for aadhaar verification:

const verifyAadhaar = async (req,res) => {
    try {
        const { input } = req.body;
        console.log(input);
        //Checking if the entered number is aadhaar or virtual ID :
        
        if(input.length == 12) {                   //Entered input is Aadhaar number.
            const validAadhaar = await db.query(`SELECT * FROM uidai_aadhar_det WHERE aadhar_no=$1`,[input]);

            if (validAadhaar.rows.length != 0) {             //if aadhaar number is valid.
                const existingAadhaar = await db.query(`SELECT * FROM applicant_reg WHERE aadhaar_no=$1`,[input]);
                if(existingAadhaar.rows.length == 0){              //if aadhaar number has not been registered already.
                    const responseData = {
                        success: true,
                        message: "Aadhaar verification successfull!",
                    }
                    res.status(200).json(responseData);
                } else {                                            //if aadhaar number has already been registered.
                    const responseData = {
                        success: true,
                        message: "Aadhaar already registered! Please go to login page.",
                    }
                    res.status(200).json(responseData);
                }
            } else {                                        //if aadhaar number is invalid.
                const responseData = {
                    success: false,
                    message: "Aadhaar is invalid!",
                }
                res.status(200).json(responseData);
            }
        // } else if (input.length == 16) {          //Entered input is Virtual ID.
        //     console.log(input);
        //     const validVirtualID = await db.query(`SELECT * FROM uidai_aadhar_det WHERE virtual_id=$1`,[input]);      

        //     if (validVirtualID.rows.length != 0) {          //if virtual ID is valid.
        //         const existingVirtualID = await db.query(`SELECT * FROM nsp_st_reg WHERE virtual_id=$1`,[input]);
        //         if(existingVirtualID.rows.length == 0){         //if virtual ID is not already registered.
        //             const responseData = {
        //                 success: true,
        //                 message: "Virtual ID verification successfull!",
        //             }
        //             res.status(200).json(responseData);
        //         } else {                                        //if virtual ID is already registered.
        //             const responseData = {
        //                 success: true,
        //                 message: "Virtual ID already registered! Please go to login page.",
        //             }
        //             res.status(200).json(responseData);
        //         }
        //     } else {                                        //if virtual ID is invalid.
        //         const responseData = {
        //             success: false,
        //             message: "Virtual ID is invalid!",
        //         }
        //         res.status(200).json(responseData);
        //     }
        // } else {                                    //Entered input is invalid i.e neither aadhaar nor virtual ID.
        //     const responseData = {
        //         success: false,
        //         message: "Enter valid aadhar or virtual ID.",
        //     }
        //     res.status(200).json(responseData);
        }
    } catch (error) {
        console.error("Error logging in for student:", error);
        res.status(500).json({ error: "Internal server error." });
    }
}

//Function for application ID verification:

const verifyAppId = async (req,res) => {
    try {
        const { applicationId } = req.body;
        console.log(applicationId);
        //Checking if student is already registered or not: 
        const existingAppId = await db.query(`SELECT * FROM applicant_reg WHERE "Applicant_id"=$1`,[applicationId]);

        if (existingAppId.rows.length === 0) {      //if application ID is invalid.
            const responseData = {
                success: false,
                message: "Application ID verification failed!",
            };
            res.status(200).json(responseData);       
        } else {                                    //if application ID is valid.
            const responseData = {
                success: true,
                message: "Application ID verification successfull!",
            }
            res.status(200).json(responseData);
        }
    } catch (error) {
        console.error("Error logging in for student:", error);
        res.status(500).json({ error: "Internal server error." });
    }
}

const getStudentProfile = async (req,res) => {
    const { appId } = req.body;
    try {
        const aadhaar = await db.query(`SELECT aadhaar_no FROM nsp_st_reg WHERE app_id=$1`,[appId]);
        const result = await db.query(`SELECT * FROM uidai_aadhar_det WHERE aadhar_no=$1`,[aadhaar.rows[0].aadhaar_no]);
        res.status(200).json(result.rows[0]);
    } catch(error) {
        console.error("Error getting student profile: ",error);
        res.status(500).json({ message: "Internal server error! "});
    }
}

const updateStudentProfile = async (req,res) => {
    const { aadhaar_no, mobile, email, address } = req.body;
    try { 
        await db.query(`UPDATE uidai_aadhar_det
                SET address=$1 , email_id=$2, phone_no=$3
                WHERE aadhar_no=$4`,[address,email,mobile,aadhaar_no]);

        res.status(200).json({message: "Changes saved successfully!"});
    } catch(error) {
        console.error("Error saving profile changes: ",error);
        res.status(500).json({message: "Internal server error!"});
    }
}

export {verifyAadhaar,verifyAppId, getStudentProfile, updateStudentProfile};