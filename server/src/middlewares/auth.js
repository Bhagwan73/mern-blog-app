const { verify} = require("jsonwebtoken")
require("dotenv").config({path:"../.env"})

exports.authentication=(req,res,next)=>{
    try{
        const token = req.cookies.token;
    if(!token) return res.status(400).send({status:false,messgae:"user is not loggedIn please login first"})
    verify(token,process.env.SEC_KEY,(err,data)=>{
        if(err) return res.status(403).send({status:false,message:err})
        req.id=data.userId
       next()
    })
}catch(err){
    return res.status(500).send({status:false,message:err.message})
}
}