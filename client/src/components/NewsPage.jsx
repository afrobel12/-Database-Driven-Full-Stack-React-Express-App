import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import LikeBtn from "./LikeBtn";

export default function NewsPage() {
    const [input, setInput]= useState([])
    const location = useLocation()
    const formData = location.state?.formData ??{}
    const URL= "https://database-driven-full-stack-react-express-app-kyor.vercel.app"||`http://localhost:9663`


    useEffect(() => {
        getUsersDb()
    
    }, []) 

      
    let usersDetails = input.map((input) => (
        <div key={input.id}>
            <h1>{input.title}</h1>
            <p>{input.content}</p>
            <button onClick={() => handleDelete(input.id)}>Delete </button>
            <LikeBtn />
        
            
        </div>
    ))
    async function getUsersDb() {
        let data = await fetch(`${URL}/news`)

        let result = await data.json()
        setInput(result)
    }

    async function handleDelete(id) {
        let result = await fetch (`${URL}/news/${id}`, {
            method: "DELETE"
        })
         console.log(result)
         if (result.ok) {
            getUsersDb ()
         }
    }
    return(
        <div >
            <h2>Subimiited posts</h2>
            <h1>{formData.title}</h1>
            <p>{formData.content}</p>
            {usersDetails }
        </div>
    )
}