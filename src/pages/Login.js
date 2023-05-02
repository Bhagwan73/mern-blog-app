import { BASE_URL } from '../config';
import { useContext, useState } from "react"
import {Link, Navigate} from "react-router-dom"
import { UserContext } from "../UserContex"

export default function Login(){
    const [username,setUsername]=useState("")
    const [password,setPassword]=useState("")
    const [redirect,setRedirect]=useState(false)
    const {setUserInfo}=useContext(UserContext)
    
    const login=async function(event){
        event.preventDefault()
        const responce=await fetch(`${BASE_URL}/login`,{
            method:"POST",
            body:JSON.stringify({
                username,
                password
            }),
            credentials:'include',
            headers:{"Content-type":"application/json"}
        })
        if(responce.status===200) {
            responce.json()
            .then((userInfo)=>{
                setUserInfo(userInfo)
                setRedirect(true)
            })
            alert(`${username} login sucessfully`) 
        }
        else alert("Invalid Credentials")

    }
    if(redirect) return <Navigate to={"/"}/>

    return (
        <div className="form-container">
        <form className="sign_up-login-form" onSubmit={login}>
            <h1>Welcome Back</h1>
            <span>To keep connected with us please login with your personal info</span>
            <input type="text"  value={username} placeholder="username" 
               onChange={e=> setUsername (e.target.value)}/>
            <input type="password"  value={password}  placeholder="password"
             onChange={e=> setPassword (e.target.value)}/>
            <button className="btn">Login</button>
            <Link to={"/signUp"}>Dont have an account ? </Link>
        </form>
        </div>
    )
}


