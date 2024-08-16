// emailService.js
const NodemailerStrategy = require('./nodemailerStrategy');
const MailgunStrategy = require('./mailgunStrategy');

class EmailService {
    constructor() {
        this.strategy = new NodemailerStrategy(); // Default strategy
        this.failureCount = 0;
        this.MAX_FAILURES = 3;
    }

    async sendEmail(recipientEmail) {
        try {
            await this.strategy.sendEmail(recipientEmail);
            this.failureCount = 0; // Reset failure count on success
            return `Email sent successfully to ${recipientEmail}`;
        } catch (error) {
            this.failureCount++;
            console.log(error.message)
            if (this.failureCount >= this.MAX_FAILURES) {
                console.log("Switching to Mailgun after 3 consecutive failures...");
                this.strategy = new MailgunStrategy();
                this.failureCount = 0; // Reset failure count after switching
                return this.sendEmail(recipientEmail);
            } else {
                throw new Error(`Failed to send email using current strategy. Attempts remaining: ${this.MAX_FAILURES - this.failureCount}`);
            }
        }
    }
}

module.exports = EmailService;
