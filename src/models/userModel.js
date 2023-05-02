const mongoose=require("mongoose")
const userSchema=new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    mobile:{
        type:Number,
        require:true
    },
    username:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    },
    isDeleted:{
        type:Boolean,
        default:false
    }
},{timestamps:true})
module.exports=mongoose.model("User",userSchema)