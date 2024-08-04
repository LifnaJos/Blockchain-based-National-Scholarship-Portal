import nodeMailer from 'nodemailer';

const transporter = nodeMailer.createTransport({
    service: 'Gmail',
    auth: {
      user: '2022.vedang.gambhire@ves.ac.in', // Your email address
      pass: 'vedang@123' // Your email password or app-specific password
    }
  });

const sendEmail = async (to, subject, text) => {
    try {
      // Send mail with defined transport object
      let info = await transporter.sendMail({
        from: '2022.kushl.alve@ves.ac.in', // Sender's email address
        to: to, // List of recipients
        subject: subject, // Subject line
        text: text // Plain text body
      });
      console.log("Message sent: %s", info.messageId);
      return { success: true, messageId: info.messageId };
    } catch (error) {
      console.error("Error occurred while sending email:", error);
      return { success: false, error: error.message };
    }
  };
  
export default sendEmail;