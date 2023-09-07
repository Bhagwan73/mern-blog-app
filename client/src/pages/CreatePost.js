import { BASE_URL } from '../config';
import { useState } from "react"
import Editor from "../Editor"
import 'react-quill/dist/quill.snow.css';
import { Navigate } from "react-router-dom";

export default function CreatePost(){
    const [title,setTitle]=useState("")
    const [summary,setSummary]=useState("")
    const [file,setFile]=useState("")
    const [content,setContent]=useState("")
    const [redirect,setRedirect]=useState(false)
   
    let createNewPost=async function (event){
      try{
       const data=new FormData()
       data.append('title',title)
       data.append('summary',summary)
       data.append('blogImage',file[0])
       data.append('content',content)

       event.preventDefault()
       const responce= await fetch(`${BASE_URL}/createPost`,{  
        method:"POST",
        body:data,
        credentials:'include'
       })

       let result= await responce.json()
           if(result.status){
               setRedirect(true)
               alert(result.message)
           }else alert(result.message)
      }catch(err){
        return ({error:err.message})
      }
    }
    if(redirect) return <Navigate to={"/"}/>
    return (
       <form className="post_form" onSubmit={createNewPost}>
        <h1>Create a New Post</h1>
        <span>Welcome to the post creation page! Here, you can craft a new post to share with the world.</span>
        <input type="text" placeholder="title" value={title} onChange={e=>setTitle(e.target.value)} />
        <input type="text" placeholder="summery" value={summary} onChange={e=>setSummary(e.target.value)}/>
        <input type="file"  onChange={e=>setFile(e.target.files)} />
         <Editor className="editor" value={content} onChange={setContent} ></Editor>
        <button className="btn">create Post</button>
       </form>
    )
}