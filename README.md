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
## Why Strategy Pattern?
After recommendation of chatgpt, strategy pattern is choosen.Did research about this pattern in youtube tutorial by Christopher as well as downloading book name Headfirst design patterns.
Strategy pattern defined as per book Headfirst design patterns is family of algorithms encapsulated each algorithm which are interchangeable without need to change client when algorithm changes.
The Strategy Pattern was chosen for its flexibility and scalability.Code wont break whether 200 members request to server or 2 million users but still load also depends on infrastructure like
cpu,ram etc... we have bought from Cloud services as rent.
It allows for easily adding new email providers in the future without modifying existing code.Adding new features to existing code is nothing but extensibility.
The logic for selecting and switching providers is decoupled from the actual email-sending logic, promoting maintainability.And we know maintainability is able to read code and fix bugs without
spending much time.
We can observe polymorphism from oops concept being used in this pattern clearly.After all Learning about Low level design is part of plan in upcoming 2 years.
## primary email service provider as Nodemailer and secondary email service provider as Mailgun:
Choosed Nodemailer as primary email service provider as we can send emails  to any gmail account we want without need to need for acknowledgement to send mail from recipients like Mailgun is needed.
The primary email service provider (Nodemailer) will fail three times before switching to the secondary provider (Mailgun).
The environment variables for email configurations (such as EMAIL, PASSWORD, MAILGUN_API_KEY, and DOMAIN_NAME) are correctly set in the .env file.
The recipient's email address is valid and correctly passed as a query parameter.
Hypotheses:
The ability to switch email providers dynamically will ensure higher reliability in email delivery, especially in case of issues with one provider.
Using the MVC and Strategy patterns will result in a more maintainable and scalable codebase that can easily accommodate future enhancements or changes.

## usecases :
The need to switch email providers after repeated failures is applicable in scenarios where reliable email delivery is crucial, such as job application acknowledgments after we have applied
via linkedin,password reset emails when we forgot password in platforms like hackerrank and leetcode and important notifications.t
Transactional Emails: E-commerce platforms sending order confirmations, shipping updates, and invoices need reliable email delivery. If one email provider fails, switching ensures the customer 
receives these critical communications.
Account Verification: Websites requiring email verification during user registration can use this strategy to ensure the verification email is sent, even if one provider fails.
Alerting Systems: In monitoring and alerting systems where alerts are sent via email (e.g., for server downtime or security breaches), ensuring the alert is delivered even if the primary email provider
fails is vital.
Newsletter and Marketing Emails: Companies sending out newsletters or marketing emails might use this approach to guarantee that their emails reach the audience, even if there are issues with one provider.
