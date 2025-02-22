const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER, // Your Gmail address
        pass: process.env.EMAIL_PASS, // App password (NOT your actual Gmail password)
    },
});

// Verify SMTP connection (debugging)
transporter.verify((error, success) => {
    if (error) {
        console.error("SMTP Connection Error:", error);
    } else {
        console.log("SMTP is ready to send emails.");
    }
});

const sendEmail = async (to, subject, html) => {
    try {
        // console.log("here inside sendEmail");
        const mailOptions = {
            from: `"CoachifyTree" <${process.env.EMAIL_USER}>`, // Sender's address
            to, // Recipient's email
            subject, // Email subject
            html, // HTML content
        };

        // Send the email
        const info = await transporter.sendMail(mailOptions);
        console.log("✅ Email sent successfully: %s", info.messageId);
        return true;
    } catch (error) {
        console.error("❌ Error sending email:", error.response || error);
        throw new Error("Could not send email. Please try again later.");
    }
};

module.exports = sendEmail;
