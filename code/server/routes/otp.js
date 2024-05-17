import express from "express";
import * as otpService from "../services/otpService.js";

const otpRoute = express.Router();

otpRoute.use(express.json());

otpRoute.post("/send-otp", otpService.sendOTP);    //to send otp in case of TAN.

otpRoute.post("/verify-otp", otpService.verifyOTP);      //to verify otp in case of TAN.

otpRoute.post("/aadhaar/send-otp", otpService.sendAadhaarOTP);    //to send otp in case of Aadhaar.

otpRoute.post("/aadhaar/verify-otp", otpService.verifyAadhaarOTP);      //to verify otp in case of Aadhaar.

otpRoute.post("/regId/send-otp", otpService.sendRegIdOTP);    //to send otp in case of regId.

otpRoute.post("/regId/verify-otp", otpService.verifyRegIdOTP);     //to verify otp in case of regId.

otpRoute.post("/virtualId/send-otp", otpService.sendVirtualIdOTP);    //to send otp in case of virtualId.

otpRoute.post("/virtualId/verify-otp", otpService.verifyVirtualIdOTP);        //to verify otp in case of virtualId.

otpRoute.post("/appId/send-otp", otpService.sendAppIdOTP);         //to send otp in case of appId.

otpRoute.post("/appId/verify-otp", otpService.verifyAppIdOTP);     //to verify otp in case of appId.


export default otpRoute;