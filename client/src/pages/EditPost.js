import { BASE_URL } from '../config';
import { useEffect, useState } from "react"
import { Navigate, useParams } from "react-router-dom"
import Editor from "../Editor"

export default function EditPost(){
    const [title,setTitle]=useState("")
    const [summary,setSummary]=useState("")
    const [file,setFile]=useState("")
    const [content,setContent]=useState("")
    const [redirect,setRedirect]=useState(false)
    const {id}=useParams()

    useEffect(()=>{
        const fetchData=async ()=>{
            const res=await fetch(`${BASE_URL}/post/${id}`)
            const responce=await res.json()
              if(responce) {
                setTitle(responce.title)
                setContent(responce.content)
                setSummary(responce.summary)
              }
        }
        fetchData()
    },[])

    const updatePost= async function (event){
        event.preventDefault()
        const data=new FormData()
        data.set('title',title)
        data.set('summary',summary)
        data.set('content',content)
        if(file?.[0]) data.set('blogImage',file?.[0])
        
        const responce= await fetch(`${BASE_URL}/edit/${id}`,{
            method:'PUT',
            body:data,
            credentials:'include'
        })
        if(responce.ok) setRedirect(true)
    }
       if(redirect) return <Navigate to={`/post/${id}`} />
    return (
         <form className="post_form" onSubmit={updatePost}>
            <h1>Edit Your Post</h1>
            <span>Update your post by making changes to the title, summary, content, or image.</span>
        <input type="text" placeholder="title" value={title} onChange={e=>setTitle(e.target.value)} />
        <input type="text" placeholder="summery" value={summary} onChange={e=>setSummary(e.target.value)}/>
        <input type="file"  onChange={e=>setFile(e.target.files)} />
         <Editor value={content} onChange={setContent} />
        <button className="btn">Update</button>
       </form>
    )
}