// send_email.js
const EmailService = require('./emailService');
const emailService = new EmailService();

const nodemailerFunction = async (req, res) => {
    const { recipientEmail } = req.query;
    try {
        const response = await emailService.sendEmail(recipientEmail);
        res.status(200).send({ email: response });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

module.exports = { nodemailerFunction };
