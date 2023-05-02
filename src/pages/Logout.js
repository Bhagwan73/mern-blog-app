import { BASE_URL } from '../config';
import { useContext, useState } from "react";
import { UserContext } from "../UserContex";
import { Navigate } from "react-router-dom";

export default function LogOut(){
    const [redirect,setRedirect]=useState(false)
    const {setUserInfo}=useContext(UserContext)
        fetch(`${BASE_URL}/logOut`,{
           credentials:"include",
           method:"POST"
        })
        .then((res)=>{
            res.json().then((responce)=>{
            if(responce.status){
            setUserInfo(null)
            setRedirect(true)
            }else alert ('user logout failed')
            })
        })
        
         if(redirect) return <Navigate to={"/"}/>
}