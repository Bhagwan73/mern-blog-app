import { BASE_URL } from '../config';
import { useState } from "react"
import { Link, Navigate } from "react-router-dom"

export default function Register() {
    const [name, setName] = useState("")
    const [mobile, setMobile] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [redirect,setRedirect]=useState(false)

    const register = async function (event) {
        event.preventDefault()
        if(!name || !mobile || !username ||! password){
            alert(`Please fill out all field`);
            return;
        }

       let responce= await fetch(`${BASE_URL}/createUser`, {
            method: "POST",
            body:JSON.stringify({
                name,
                mobile,
                username,
                password
            }),
            headers: { "Content-Type": "application/json" }
        })
        const res=await responce.json()
        console.log(res)
        if(res.status) {
            setRedirect(true)
            alert(`${res.message}`)
        }
        else alert( alert(`${res.message}`))
    }
    if(redirect) return <Navigate to={"/login"}/>
    return (
        <div className="form-container">
        <form className="sign_up-login-form" onSubmit={register}>
            <h1>Create Account</h1>
        <span>Create your account. it's free and only takes a minute.</span>
            <input type="text" value={name} placeholder="first and last name"
                onChange={e => setName(e.target.value)}  />

            <input type="number" value={mobile} placeholder="Mobile number"
                onChange={e => setMobile(e.target.value)} />

            <input type="text" value={username} placeholder="username"
                onChange={e => setUsername(e.target.value)} />

            <input type="password" value={password} placeholder="password"
                onChange={e => setPassword(e.target.value)} />
            <button className="btn">SignUp</button>
            <Link to={"/login"}>Already have an account ?</Link>
        </form>
        </div>
    )
}