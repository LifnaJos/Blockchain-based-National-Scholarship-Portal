import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import poRoute from "./routes/po.js";
import otpRoute from "./routes/otp.js";
import aadhaarRoute from "./routes/aadhaar.js";
import studentRoute from "./routes/student.js";
import instituteRoute from "./routes/institute.js";
import applicantRoute from "./routes/applicant.js";

const app = express();
const port = 4000;
console.log(`Attempting to start server on port ${port}`);  // Add this line for debugging

app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cors());
app.use("/po", poRoute);
app.use("/otp", otpRoute);
app.use("/aadhaar", aadhaarRoute);
app.use("/student", studentRoute);
app.use("/institute", instituteRoute);
app.use("/applicant", applicantRoute);

app.listen(port, () => {
    console.log(`Server started at port ${port}`);
});

