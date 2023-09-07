import { BASE_URL } from '../config';
import { useContext, useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { UserContext } from "../UserContex"

export default function PostPage(){
    const [post,setPost]=useState("")
    const {userInfo}=useContext(UserContext)
    const {id}=useParams()
    useEffect(()=>{
      const fetchData=async ()=>{
         const responce=await fetch(`${BASE_URL}/post/${id}`)
         const posts=await responce.json()
         setPost(posts)
      }
      fetchData()
    },[])
    if(!post) return ''
    return (
        <div className="post_page">
          <h1>{post.title}</h1>
          <Link  to={"/"} style={{fontSize:'30px'}}> 🔙 </Link>
          <nav className="navbar">
            <div className="post-meta">
            <div className="author">{post.author.name}</div>
            <time>{post.createdAt.slice(0,10)}</time>
            </div>
            {/* checks the authorization of a user to delete or update their own post */}
            {userInfo && userInfo.userId===post.author._id && (   
          <div className="post_operations">
            <Link to={`/edit/${post._id}`}  className="edit-btn"> Edit </Link>
            <Link to={`/delete/${post._id}`}  className="delete-btn"> Delete </Link>
        </div>
        ) }
      </nav>

      <div className="image" >
       <img src={post.blogImage} alt=""/>
      </div>
      <div  dangerouslySetInnerHTML={{__html:post.content}} />
     
      </div>
    )
}