import { BASE_URL } from '../config';
import { useEffect, useState } from "react"
import { Navigate, useParams } from "react-router-dom"
export default function DeletePost() {
    const [redirect, setRedirect] = useState(false)
    const { id } = useParams()
    useEffect(() => {
        const fetchData = async () => {
            let responce = await fetch(`${BASE_URL}/delete/${id}`, {
                method: 'DELETE',
                credentials: 'include'
            })
            let res = await responce.json()
            if (res.status) {
                setRedirect(true)
                alert(`${res.message}`)
            } else if(!res.status) alert(`${res.message}`)
        }
        fetchData()
    }, [])
    if (redirect) return <Navigate to={"/"} />
}