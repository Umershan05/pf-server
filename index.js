require('dotenv').config()
const express =require('express')
const cors =require('cors')
const router=require('./Routes/router')
require('./DB/connection')
// create an express application
const  pfServer=express()
pfServer.use(cors())
pfServer.use(express.json())
pfServer.use(router)
const PORT=4000 || process.env.PORT
pfServer.listen(PORT,()=>{
    console.log(`project fair server started at port:${PORT}and waiting for client request!!`);
})
// http get request resolving to http://localhost:4000/
pfServer.get('/',(req,res)=>(
    res.send(`<h1>project fair server started at port and waiting for client request!!</h1> `)
))