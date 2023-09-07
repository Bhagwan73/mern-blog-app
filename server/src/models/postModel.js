const mongoose=require("mongoose")
const {ObjectId,Mixed}=mongoose.Schema.Types

const postSchema=new mongoose.Schema({
    title:{
        type:String,
        require:true
    },
    summary:{
        type:String,
        require:true
    },
    blogImage:{
        type:String,
        require:true
    },
    content:{
        type:Mixed,
        require:true
    },
    author:{
        type:ObjectId,
        ref:'User'
    },
    isDeleted:{
        type:Boolean,
        default:false
    }
},{timestamps:true})

module.exports=mongoose.model('Blog',postSchema)