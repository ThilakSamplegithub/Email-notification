const express=require('express')
const app=express()
app.use(express.json())
require('dotenv').config()
const port=process.env.PORT
console.log(port)
app.get('/',(req,res)=>{
   return res.status(200).send(`<h1>Hello world</h1>`)
})
app.listen(port, () => {
   console.log(`port ${port} running on port 3000`)
});