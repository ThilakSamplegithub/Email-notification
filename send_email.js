const nodemailer = require('nodemailer');
const { Router } = require('express');
const formData = require('form-data');
const Mailgun = require('mailgun.js');
const router = Router();
require('dotenv').config();
console.log(process.env.PASSWORD,'is password i commneted')
// Nodemailer transporter
const transporter = nodemailer.createTransport({
    service: "Gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
    },
});

// Mailgun client
const mailgun = new Mailgun(formData);
const mg = mailgun.client({ username: 'api', key: process.env.MAILGUN_API_KEY });

// Failure counter
let failureCount = 0;
const MAX_FAILURES = 3;

console.log('invoked outside');

router.post(`/sendEmail`, async (req, res) => {
    console.log('invoke me');
    const { recipientEmail } = req.query;
    console.log(recipientEmail, 'is the email I want to send');

    try {
        // Nodemailer email options
        const mailOptions = {
            from: process.env.EMAIL,
            to: recipientEmail,
            subject: "Hello from Nodemailer",
            text: "This is a test email sent using Nodemailer.",
        };

        // Attempt to send the email using Nodemailer
        transporter.sendMail(mailOptions, async (error, info) => {
            if (error) {
                console.error("Error sending email via Nodemailer: ", error);
                failureCount++;

                if (failureCount >= MAX_FAILURES) {
                    console.log("Switching to Mailgun after 3 consecutive failures...");

                    try {
                        await sendViaMailgun(recipientEmail);
                        res.status(200).send({ email: `Email sent successfully to ${recipientEmail} using Mailgun` });
                        failureCount = 0; // Reset failure count after a successful send
                    } catch (mailgunError) {
                        res.status(500).send({ error: `Both providers failed. Error: ${mailgunError.message}` });
                    }
                } else {
                    res.status(500).send({ error: `Failed to send email using Nodemailer. Attempts remaining: ${MAX_FAILURES - failureCount}` });
                }
            } else {
                console.log("Email sent: ", info.response);
                failureCount = 0; // Reset failure count on success
                res.status(200).send({ email: `Email sent successfully to ${recipientEmail} using Nodemailer` });
            }
        });
    } catch (err) {
        res.status(400).send({ err: err.message });
    }
});

// Function to send email using Mailgun
async function sendViaMailgun(recipientEmail) {
    return mg.messages.create(process.env.DOMAIN_NAME, {
        from: "Excited User <thakurtilaksingh918@gmail.com>",
        to: [recipientEmail],
        subject: "Hello",
        text: "Testing some Mailgun awesomeness!",
        html: "<h1>Testing some Mailgun awesomeness!</h1>"
    });
}

module.exports = { router };
