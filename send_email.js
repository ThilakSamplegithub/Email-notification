const nodemailer = require('nodemailer');
const {Router}=require("express")
const router=Router()
require('dotenv').config()
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
  console.log('invoked outside')
router.post(`/sendEmail`,async(req,res)=>{
    console.log('invoke me')
    const {recipientEmail}=req.query
    console.log(recipientEmail,'is email i wanna send')
    try{
        const mailOptions = {
            from: process.env.EMAIL,
            to: "truimphthilak@gmail.com",
            subject: "Hello from Nodemailer",
            text: "This is a test email sent using Nodemailer.",
          };
          transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
              console.error("Error sending email: ", error);
            } else {
              console.log("Email sent: ", info.response);
            }
          });
          res.status(200).send({email:`email sent successfully to ${recipientEmail}`})
    }catch(err){
res.status(400).send({err:err.message})
    }
})
module.exports={router}