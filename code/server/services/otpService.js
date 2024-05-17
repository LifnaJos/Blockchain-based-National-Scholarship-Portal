import { error, log } from "console";

const otpStorage = {};

//Function to send OTP:
const sendOTP = async (req, res) => {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    console.log(otp);
    try {
        const { tan } = req.body;
        console.log(tan);
        //Storing the generated OTP for verification:
        otpStorage[tan] = otp;

        res.status(200).json({
            message: `OTP : ${otp}`,
            otp: otp,
        });
    } catch (error) {
        console.error("Error sending OTP:", error);
        res.status(500).json({ error: "Internal server error!" });
    }
}

//Function to send OTP in case of Aadhar:
const sendAadhaarOTP = async (req, res) => {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    console.log(otp);
    try {
        const { aadhar } = req.body;
        console.log(aadhar);
        //Storing the generated OTP for verification:
        otpStorage[aadhar] = otp;

        res.status(200).json({
            message: `OTP : ${otp}`,
            otp: otp,
        });
    } catch (error) {
        console.error("Error sending OTP:", error);
        res.status(500).json({ error: "Internal server error!" });
    }
}

//Function to send OTP in case of registrationId:
const sendRegIdOTP = async (req, res) => {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    console.log(otp);
    try {
        const { registrationId } = req.body;
        console.log(registrationId);
        //Storing the generated OTP for verification:
        otpStorage[registrationId] = otp;

        res.status(200).json({
            message: `OTP : ${otp}`,
            otp: otp,
        });
    } catch (error) {
        console.error("Error sending OTP:", error);
        res.status(500).json({ error: "Internal server error!" });
    }
}

//Function to send OTP in case of virtual id:
const sendVirtualIdOTP = async (req, res) => {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    console.log(otp);
    try {
        const { virtualId } = req.body;
        console.log(virtualId);
        //Storing the generated OTP for verification:
        otpStorage[virtualId] = otp;

        res.status(200).json({
            message: `OTP : ${otp}`,
            otp: otp,
        });
    } catch (error) {
        console.error("Error sending OTP:", error);
        res.status(500).json({ error: "Internal server error!" });
    }
}

//Function to send OTP in case of application id:
const sendAppIdOTP = async (req, res) => {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    console.log(otp);
    try {
        const { appId } = req.body;
        console.log(appId);
        //Storing the generated OTP for verification:
        otpStorage[appId] = otp;

        res.status(200).json({
            message: `OTP : ${otp}`,
            otp: otp,
        });
    } catch (error) {
        console.error("Error sending OTP:", error);
        res.status(500).json({ error: "Internal server error!" });
    }
}

//Function to verify OTP:
const verifyOTP = async (req, res) => {
    try {
        const { tan, userEnteredOTP } = req.body;

        const storedOTP = otpStorage[tan];

        //Verifying if user entered OTP is correct:
        if (userEnteredOTP === storedOTP) {
            //OTP is correct. So we remove the stored OTP.
            delete otpStorage[tan];
            //Storing the org_id for further scholarship details purpose:
            res.status(200).json({ status: "success", message: "OTP verified successfully" });
        } else {
            //OTP is incorrect.
            delete otpStorage[tan];
            res.status(200).json({ status: "error", message: "Invalid OTP, generate OTP again." });
        }
    } catch (error) {
        console.error("Error verifying OTP: ", error);
        res.status(500).json({ error: "Internal server error!" });
    }
}

//Function to verify OTP in case of Aadhar:
const verifyAadhaarOTP = async (req, res) => {
    try {
        const { aadhar, userEnteredOTP } = req.body;

        const storedOTP = otpStorage[aadhar];

        //Verifying if user entered OTP is correct:
        if (userEnteredOTP === storedOTP) {
            //OTP is correct. So we remove the stored OTP.
            delete otpStorage[aadhar];
            //Storing the org_id for further scholarship details purpose:
            res.status(200).json({ status: "success", message: "OTP verified successfully" });
        } else {
            //OTP is incorrect.
            delete otpStorage[aadhar];
            res.status(200).json({ status: "error", message: "Invalid OTP, generate OTP again." });
        }
    } catch (error) {
        console.error("Error verifying OTP: ", error);
        res.status(500).json({ error: "Internal server error!" });
    }
}

//Function to verify OTP for registration ID:
const verifyRegIdOTP = async (req, res) => {
    try {
        const { registrationId, userEnteredOTP } = req.body;

        const storedOTP = otpStorage[registrationId];

        //Verifying if user entered OTP is correct:
        if (userEnteredOTP === storedOTP) {
            //OTP is correct. So we remove the stored OTP.
            delete otpStorage[registrationId];
            //Storing the org_id for further scholarship details purpose:
            res.status(200).json({ status: "success", message: "OTP verified successfully" });
        } else {
            //OTP is incorrect.
            delete otpStorage[registrationId];
            res.status(200).json({ status: "error", message: "Invalid OTP, generate OTP again." });
        }
    } catch (error) {
        console.error("Error verifying OTP: ", error);
        res.status(500).json({ error: "Internal server error!" });
    }
}

//Function to verify OTP for virtual ID:
const verifyVirtualIdOTP = async (req, res) => {
    try {
        const { virtualId, userEnteredOTP } = req.body;

        const storedOTP = otpStorage[virtualId];

        //Verifying if user entered OTP is correct:
        if (userEnteredOTP === storedOTP) {
            //OTP is correct. So we remove the stored OTP.
            delete otpStorage[virtualId];
            //Storing the org_id for further scholarship details purpose:
            res.status(200).json({ status: "success", message: "OTP verified successfully" });
        } else {
            //OTP is incorrect.
            delete otpStorage[virtualId];
            res.status(200).json({ status: "error", message: "Invalid OTP, generate OTP again." });
        }
    } catch (error) {
        console.error("Error verifying OTP: ", error);
        res.status(500).json({ error: "Internal server error!" });
    }
}

//Function to verify OTP for application ID:
const verifyAppIdOTP = async (req, res) => {
    try {
        const { appId, userEnteredOTP } = req.body;

        const storedOTP = otpStorage[appId];

        //Verifying if user entered OTP is correct:
        if (userEnteredOTP === storedOTP) {
            //OTP is correct. So we remove the stored OTP.
            delete otpStorage[appId];
            //Storing the org_id for further scholarship details purpose:
            res.status(200).json({ status: "success", message: "OTP verified successfully" });
        } else {
            //OTP is incorrect.
            delete otpStorage[appId];
            res.status(200).json({ status: "error", message: "Invalid OTP, generate OTP again." });
        }
    } catch (error) {
        console.error("Error verifying OTP: ", error);
        res.status(500).json({ error: "Internal server error!" });
    }
}

export { sendOTP , verifyOTP, sendRegIdOTP, verifyRegIdOTP, sendAadhaarOTP, verifyAadhaarOTP, sendVirtualIdOTP, verifyVirtualIdOTP, sendAppIdOTP, verifyAppIdOTP };