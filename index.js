const express=require("express")
const app=express()
const mongoose=require("mongoose")
const route=require("./src/route/router")
const corse=require("cors")
require("dotenv").config({path:"./.env"})
const cookieParser=require("cookie-parser")
app.use(cookieParser())
app.use(express.json())
app.use(corse())
app.use("/",route)     

mongoose.connect(process.env.MONGO_STRING,{useNewUrlParser:true})
.then(()=>console.log("Mongodb is connected"))
.catch((err)=>console.log(err))



app.listen(process.env.PORT || 5000,()=>{  
    console.log(`express running on port `+ `${process.env.PORT}`||5000)
})
