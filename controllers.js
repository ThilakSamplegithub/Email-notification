const {Router}=require('express')
const { nodemailerFunction } = require('./send_email')
const router=Router()
router.post('/sendEmail',nodemailerFunction)
module.exports={router}