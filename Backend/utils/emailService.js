const sgMail = require('@sendgrid/mail');
require('dotenv').config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendEmail = async (to, subject, html) => {
    try {
        const msg = {
            from: `"CoachifyTree" <coachifytree@gmail.com>`, 
            to,
            subject,
            html,
        };

        // Send the email
        await sgMail.send(msg);

        // console.log("✅ Email sent successfully via SendGrid");
        return true;

    } catch (error) {
        // Log the detailed error from SendGrid
        console.error("❌ Error sending email:", error.response?.body || error.message);
        throw new Error("Could not send email. Please try again later.");
    }
};

module.exports = sendEmail;