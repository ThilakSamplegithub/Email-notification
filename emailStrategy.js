// emailStrategy.js
class EmailStrategy {
    sendEmail(recipientEmail) {
        console.log(recipientEmail,'is till here')
        throw new Error('sendEmail method must be implemented');
    }
}

module.exports = EmailStrategy;
