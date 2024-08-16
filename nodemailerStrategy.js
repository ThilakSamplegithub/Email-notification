// nodemailerStrategy.js
const nodemailer = require('nodemailer');
const EmailStrategy = require('./emailStrategy');
require('dotenv').config()
class NodemailerStrategy extends EmailStrategy {
    constructor() {
        super();
        this.transporter = nodemailer.createTransport({
            service: "Gmail",
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD,
            },
        });
    }

    sendEmail(recipientEmail) {
        return new Promise((resolve, reject) => {
            const mailOptions = {
                from: process.env.EMAIL,
                to: recipientEmail,
                subject: "Hello from Nodemailer",
                text: "This is a test email sent using Nodemailer.",
            };

            this.transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    return reject(error);
                }
                resolve(info);
            });
        });
    }
}

module.exports = NodemailerStrategy;
