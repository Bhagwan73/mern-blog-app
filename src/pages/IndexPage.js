import { BASE_URL } from '../config';
import { useEffect, useState } from "react";
import Post from "../Post";
import Pagination from '../Pagination'
export default function IndexPage(){
    const [post,setPost]=useState([])
    const [loading, setLoading]=useState(true)
    const [currentPage,setCurrentPage]=useState(1)
    const [totalPosts,setTotalPosts]=useState()

    useEffect(()=>{
      fetch(`${BASE_URL}/getPosts?page=${currentPage}`)
      .then((responce)=>responce.json())
      .then((blogs)=>{
        setLoading(false)
        setPost(blogs)
        setTotalPosts(blogs.length)
        console.log("home page")
      })
    },[currentPage])
     
    return (
       <> 
       { post.length>0 && post.map(item=>{
          return  <Post key={item._id} data={item} />
       })}
       {!loading && <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} totalPost={totalPosts} />}
       {loading &&<center> <div className="loading-icon"> </div> <h4>Loading posts...</h4> </center>}
       </>
       
    );
}


