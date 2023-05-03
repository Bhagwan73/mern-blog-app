const { hashSync, compareSync } = require("bcrypt")
const userModel = require("../models/userModel")
const { sign ,verify} = require("jsonwebtoken")
require("dotenv").config({path:"../.env"})

exports.createUser = async (req, res) => {
    try {
        const data = req.body
        const { name, mobile, username, password } = data     
        if (!name) return res.status(400).send({ status: false, message: "name is required" })
        if (!mobile) return res.status(400).send({ status: false, message: "Mobile_number is required" })
        if (!username) return res.status(400).send({ status: false, message: "username is required" })
        if (!password) return res.status(400).send({ status: false, message: "password is required" })
        data.password = hashSync(password, 10)
        const savedData = await userModel.create(data)
        return res.status(201).send({ status: true, message: "user cerated sucessfully", data: savedData })
    } catch (err) {    
        return res.status(500).send({ status: false, message: err.message })
    }
}


exports.login = async (req, res) => {
    try {
        const { username, password } = req.body
        if (!username) return res.status(400).send({ status: false, message: "username is required" })
        if (!password) return res.status(400).send({ status: false, message: "password is required" })
        const user = await userModel.findOne({ username: username })
        if (!user) return res.status(400).send({ status: false, message: "invalid username" })
        const pass = compareSync(password, user.password)
        if (!pass) return res.status(400).send({ status: false, message: "wrong password" })
        sign({username:username, userId: user._id}, process.env.SEC_KEY, (err, token) => {
            if (err) return res.status(401).send({ status: false, message: err })
            res.cookie('token', token, {
                httpOnly: true,
                secure: true, // Set to true if served over HTTPS
                sameSite: 'none' // Set to 'none' to allow cross-site cookies
              });
            return res.status(200).send({username:username,userId:user._id}) // this data will store in userContex
        })
    } catch (err) {
        return res.status(500).send({ status: false, message: err.message })
    }
}

// this api check user loggedIn or not when he was open the application
exports.userProfile=async (req,res)=>{
    try{
        const token = req.cookies.token;
      verify(token,process.env.SEC_KEY,(err,data)=>{
          if(err) return res.status(403).send({status:false,message:err})
          return res.status(200).send({status:true,data:data})
      })
    }catch(err){    
        return res.status(500).send({status:false,message:err.message})
    }
}


exports.logOut=(req,res)=>{
    try{
    res.cookie('token','')
    return res.status(200).send({status:true,message:"user logout sucessfully"})
    }catch(err){
        return res.status(500).send({status:false,message:err.message})
    }
}