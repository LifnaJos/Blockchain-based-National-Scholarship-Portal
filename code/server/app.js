import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import poRoute from "./routes/po.js";
import otpRoute from "./routes/otp.js";
import aadhaarRoute from "./routes/aadhaar.js";
import studentRoute from "./routes/student.js";

const app = express();
const port = 4000;

app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cors());
app.use("/po", poRoute);
app.use("/otp", otpRoute);
app.use("/aadhaar", aadhaarRoute);
app.use("/student", studentRoute);

app.listen(port, () => {
    console.log(`Server started at port ${port}`);
});

