const express = require("express")
const route = express.Router()

const { createUser, login, userProfile, logOut } = require("../controller/userController")
route.post("/createUser", createUser)
route.post("/login", login)
route.get("/profile", userProfile)
route.post("/logOut", logOut)


const { createBlogPost ,getPosts,post,editPost,deletePost,getUserPosts} = require("../controller/postController")
const {uploadImage}=require("../middlewares/uploadImg")
const{authentication}=require("../middlewares/auth")

route.post("/createPost",authentication,uploadImage, createBlogPost)
route.get("/getPosts",getPosts)   
route.get("/post/:postId",post)
route.put("/edit/:postId",uploadImage,editPost)
route.delete("/delete/:postId",deletePost)
route.get("/getUserPosts/:userId",getUserPosts)

module.exports = route