const express=require('express')
const app=express()
const {router}=require("./controllers.js")
// console.log(router)
app.use(express.json())
require('dotenv').config()
const port=process.env.PORT
console.log(port)
app.get('/',(req,res)=>{
   return res.status(200).send(`<h1>Hello world</h1>`)
})
app.use('/',router)
app.listen(port, () => {
   console.log(`port ${port} is running `)
});