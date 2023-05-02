import { BASE_URL } from '../config';
import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import Post from "../Post"

export default function MyPosts(){
    const {userId}=useParams()
    const [posts,seTPosts]=useState([])
    const [loading,setLoading]=useState(false)
    const [error,setError]=useState(false)
    let mypost=true
    useEffect(()=>{
        const fetchData= async function(){
        const res=await fetch(`${BASE_URL}/getUserPosts/${userId}`,{
            credentials:'include',
            method:'GET'
        })
        console.log("done")
        let responce=await res.json()
        console.log(responce)
        if(responce.status) {
            seTPosts(responce.data) 
            setLoading(true)
        }else  if(!responce.status)  setError(true)
    }
    fetchData()
    },[])
     if(error) {
        return (
            <center>
                <h2>No post found</h2>
               <Link to={"/"} style={{fontSize:'30px'}}>🔙</Link>
            </center>
        )
     }
    return (
        <>  
        {posts.map(item=>{
            return < Post  mypost={mypost}  key={item._id} data={item} />
        })}
        {!loading &&<center> <div className="loading-icon"> </div> <h4>Loading posts...</h4> </center>}
        </>
     );
}