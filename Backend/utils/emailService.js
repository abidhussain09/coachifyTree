const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER, // Your Gmail address
        pass: process.env.EMAIL_PASS, // App-specific password
    },
});

const sendEmail = async (to, subject, html) => {
    try {
        const mailOptions = {
            from: `"CoachifyTree" <${process.env.EMAIL_USER}>`, // Sender's address
            to, // Recipient's email
            subject, // Subject of the email
            html, // HTML content of the email
        };

        // Send the email
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent: %s', info.messageId);
    } catch (error) {
        console.error('Error sending email:', error.message);
        throw new Error('Could not send email. Please try again later.');
    }
};

module.exports = sendEmail;
