const postModel = require("../models/postModel")
const {uploadFile}=require("./aws-S3")

exports.createBlogPost= async (req, res) => {
    try{
      let data=req.body
      const {title,summary,content}=data
      const blogImage=req.file
      if(!title) return res.status(400).send({status:false,message:"title is mendatory"})
      if(!summary) return res.status(400).send({status:false,message:"summery is mandatory"})
      if(!content) return res.status(400).send({status:false,message:"content is mandatory"})
      if(!blogImage) return res.status(400).send({status:false,message:"blogImage is mandatory"})
      data['author']=req.id
      data['blogImage']=await uploadFile(blogImage)
      let savedData=await postModel.create(data)
      return res.status(201).send({status:true,message:"blog created sucessfully",data:savedData})
    }catch(err){
      return res.status(500).send({status:false,message:err.message})
    }
  }


  exports.getPosts=async (req,res)=>{
     try{
        let {page}=req.query
        let data=await postModel.find({isDeleted:false})
        .populate('author',['name'])
        .sort({ceratedAt:-1})
        .skip((page-1)*10)
        .limit(10)
        return res.status(200).send(data)
     }catch(err){
      return res.status(500).send({status:false,message:err.message})
     }
  }

  exports.post=async(req,res)=>{
    try{
    const {postId}=req.params
    let savedData=await postModel.findById(postId).populate('author',['name'])
    return res.status(200).send(savedData)
    }catch(err){
      return res.status(500).send({status:false,message:err.message})
    }
  }


  exports.editPost=async (req,res)=>{
    try{
       let data=req.body
      const {postId}=req.params
       if(req.file) data['blogImage']=await uploadFile(req.file)
       let updatePost=await postModel.findByIdAndUpdate({_id:postId},data)
       return res.status(200).send({status:true,message:'blog updated sucessfully',data:updatePost})
    }catch(err){
      return res.status(500).send({status:false,message:err.message})
    }
  }

  exports.deletePost=async (req,res)=>{
    try{
    const {postId}=req.params
    await postModel.findByIdAndUpdate({_id:postId},{isDeleted:true})
    return res.status(200).send({status:true,message:'blog deleted sucessfully'})
    }catch(err){
      return res.status(500).send({status:false,message:err.message})
    }
  }

  exports.getUserPosts=async (req,res)=>{
      try{
        const {userId}=req.params
        let posts=await postModel.find({author:userId,isDeleted:false}).populate('author',['name']).limit(10)
        if(posts.length==0) return res.status(404).send({status:false,message:"No post found"})
        return res.status(200).send({status:true,data:posts})
    }catch(err){
      return res.status(500).send({status:false,message:err.message})
    }
  }
  