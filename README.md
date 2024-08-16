# Email Notification Service

This project implements an email notification service using Node.js, Express, and the Strategy Design Pattern. The service attempts to send an email using Nodemailer and switches to Mailgun after three consecutive failures.
But very first time misunderstood the task as getting notification to email for password reset, sending otp etc.But writing my thoughts on paper about understanding, assumptions as well as gaps in understanding after reading task.It helped me to organise my thoughts and checked alignment of assumptions with given task using LLM model and drawn conclusions.
### Possible Causes for Email Provider Failures

In real-world scenarios, an email provider might fail due to various reasons, including:

- **Server Downtime or Outages:**  
  Email providers might experience temporary server outages or downtime, preventing them from sending or receiving emails.

- **Rate Limits Exceeded:**  
  Many email providers impose rate limits on how many emails can be sent within a certain period. If these limits are exceeded, subsequent emails might be blocked or delayed.

- **Authentication Issues:**  
  Incorrect configuration of authentication methods (like SPF, DKIM, and DMARC) might result in emails being rejected by the receiving server. Additionally, incorrect credentials (e.g., expired tokens or passwords) can prevent emails from being sent.

- **Network Problems:**  
  Network issues between the email provider’s servers and the internet can cause delays or failures in email delivery.

- **API Issues:**  
  If you’re using an email provider’s API (like with Mailgun or SendGrid), the API itself might encounter issues, such as rate limits, quota exhaustion, or changes in the API that aren't accounted for in your code.
. 
## Features

- **Primary Email Provider:** Nodemailer with Gmail.
- **Secondary Email Provider:** Mailgun.
- **Error Handling:** Switches providers after three consecutive failures.
- **Design Patterns:** Strategy Pattern, MVC Pattern.

## Prerequisites

- Node.js and npm installed
- Mailgun account and associated API key as well as domain name
- Gmail account for Nodemailer and respective gmail account as well as app password
Note: placed this crucial information in .env file as part of best practices but they are shown in the video recording i have sent.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/email-service.git
2.Run npm i to install all dependencies.
### Why Strategy Pattern?

The Strategy Pattern was chosen based on the recommendation from ChatGPT, and further research was conducted through a YouTube tutorial by Christopher and the book "Head First Design Patterns."

#### Definition:
According to "Head First Design Patterns," the Strategy Pattern is a design pattern that defines a family of algorithms, encapsulates each algorithm, and makes them interchangeable. This pattern allows for the client to change the algorithm without modifying the client code.

#### Reasons for Choosing the Strategy Pattern:
- **Flexibility and Scalability:**  
  The Strategy Pattern provides the flexibility to handle varying loads, whether there are 200 or 2 million users requesting the server. While performance also depends on the infrastructure (e.g., CPU, RAM) rented from cloud services, the Strategy Pattern ensures that the code remains robust under different conditions.

- **Extensibility:**  
  One of the key benefits of the Strategy Pattern is that it allows for the easy addition of new email providers in the future without modifying existing code. This extensibility ensures that the application can grow and adapt to new requirements over time.

- **Maintainability:**  
  The logic for selecting and switching email providers is decoupled from the actual email-sending logic, which promotes maintainability. Maintainable code is easier to read, debug, and update, allowing developers to fix bugs and add features efficiently.

- **Polymorphism:**  
  The Strategy Pattern leverages polymorphism from Object-Oriented Programming (OOP) concepts, where different algorithms (or strategies) can be used interchangeably within the same interface.

### Email Providers Setup

#### Primary and Secondary Email Providers

- **Primary Email Provider: Nodemailer**
  - **Reason for Choosing:**
    - Nodemailer allows sending emails to any Gmail account without requiring additional acknowledgements from recipients. 
    - It is chosen as the primary provider to handle email delivery straightforwardly.

- **Secondary Email Provider: Mailgun**
  - **Reason for Choosing:**
    - Mailgun is used as a fallback provider if Nodemailer fails to send an email after three attempts.
    - It requires additional setup, such as acknowledgement from the recipient, which is not needed for Nodemailer.

#### Configuration

- **Environment Variables:**
  - Email configurations for both providers are managed using environment variables, which are set in the `.env` file.
  - Variables include:
    - `EMAIL` (for Nodemailer)
    - `PASSWORD` (for Nodemailer)
    - `MAILGUN_API_KEY` (for Mailgun)
    - `DOMAIN_NAME` (for Mailgun)

- **Recipient's Email:**
  - The recipient's email address is validated and passed as a query parameter in the request.

#### Hypotheses

- **Dynamic Provider Switching:**
  - The ability to switch between email providers dynamically is expected to enhance reliability in email delivery, particularly if issues arise with the primary provider.

- **Design Patterns Used:**
  - **MVC Pattern:**
    - Helps in separating concerns, making the codebase more maintainable and scalable.
  - **Strategy Pattern:**
    - Provides flexibility to accommodate future changes or enhancements in email delivery methods without affecting the existing codebase.

By using Nodemailer as the primary provider and Mailgun as a secondary fallback, the system aims to ensure consistent email delivery while maintaining a clean, scalable, and adaptable code structure.
.

### Use Cases for Switching Email Providers

The strategy of switching email providers after repeated failures is essential in various scenarios where reliable email delivery is critical:

- **Job Application Acknowledgments:**
  - When applying for jobs via platforms like LinkedIn, it's crucial to receive confirmation that the application has been submitted. Switching providers ensures that these acknowledgments are reliably delivered even if one provider encounters issues.

- **Password Reset Emails:**
  - For platforms like HackerRank and LeetCode, password reset emails are vital when users forget their passwords. If the primary provider fails, switching to a secondary provider ensures that users receive the necessary instructions to reset their passwords.

- **Transactional Emails:**
  - E-commerce platforms need to send order confirmations, shipping updates, and invoices. Reliable delivery of these emails is critical for customer satisfaction. Switching providers helps ensure that these important communications are delivered without interruption.

- **Account Verification:**
  - During user registration, websites often require email verification. The ability to switch providers guarantees that verification emails are sent even if the primary provider fails, preventing registration issues for users.

- **Alerting Systems:**
  - In systems that monitor and alert users about server downtime or security breaches, timely delivery of alerts is crucial. Switching providers ensures that critical alerts reach recipients even if one email provider experiences problems.

- **Newsletter and Marketing Emails:**
  - Companies sending newsletters or marketing emails need to reach their audience consistently. Using a fallback provider helps ensure that these communications are delivered even if the primary email provider encounters issues.

This approach ensures the reliability and effectiveness of email communication across various critical functions.
