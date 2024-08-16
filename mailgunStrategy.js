// mailgunStrategy.js
const formData = require('form-data');
const Mailgun = require('mailgun.js');
const EmailStrategy = require('./emailStrategy');
require('dotenv').config()
class MailgunStrategy extends EmailStrategy {
    constructor() {
        super();
        const mailgun = new Mailgun(formData);
        this.client = mailgun.client({ username: 'api', key: process.env.MAILGUN_API_KEY });
    }

    sendEmail(recipientEmail) {
        return this.client.messages.create(process.env.DOMAIN_NAME, {
            from: "Excited User <thakurtilaksingh918@gmail.com>",
            to: [recipientEmail],
            subject: "Hello",
            text: "Testing some Mailgun awesomeness!",
            html: "<h1>Testing some Mailgun awesomeness!</h1>"
        });
    }
}

module.exports = MailgunStrategy;
