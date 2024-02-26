import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import LikeBtn from "./LikeBtn";


export default function DisplayPage() {
    const [input, setInput]= useState([])
    const location = useLocation()
    const formData = location.state?.formData ??{}

  
    useEffect(() => {
        getUsersDb()
    
    }, []) 

      
    let usersDetails = input.map((input) => (
        <div key={input.id}>
            <h1>{input.title}</h1>
            <p>{input.content}</p>
            <button onClick={() => handleDelete(input.id)}>Delete</button>
            < LikeBtn />
           
        
            
        </div>
    ))
    async function getUsersDb() {
        let data = await fetch(`http://localhost:9663/entertainment`)

        let result = await data.json()
        setInput(result)
    }

    async function handleDelete(id) {
        let result = await fetch (`http://localhost:9663/entertainment/${id}` ,{
            method: 'DELETE'
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