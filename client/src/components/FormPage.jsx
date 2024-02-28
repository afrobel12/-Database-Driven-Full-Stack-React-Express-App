import { useState, useEffect } from "react";
import {useNavigate} from "react-router-dom"

export default function FormPage() {
    const URL= "https://database-driven-full-stack-react-express-app-kyor.vercel.app"||`http://localhost:9663`
    const [formData, setFormData] = 
    useState({
        title: '',
        content:''
    })
    useEffect(() => {
        getUsersDb()
    }, [])

    const navigate = useNavigate()

    function handleChange (e) {
        setFormData({
            ...formData,
            [e.target.name] : e.target.value
        })

    }
    async function getUsersDb() {
        let data = await fetch(`${URL}/entertainment`)
        let result = await data.json()
        setFormData(result)
    }
    async function handlSubmit(e) {
        e.preventDefault()
        let result = await fetch(`${URL}/news` ,{
            method: 'POST',
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(formData)
        })
        if (result.ok) {
       navigate('/entertainment' && '/news', {state:{formData}} )
        }
    }


    return(
        <div className="post-page">
            <form onSubmit={handlSubmit}>
                <h1>Post here</h1>
                <label >Title:</label>
                <input placeholder="enter blog title" name="title" type="text" onChange={handleChange} id='01' />
                <label>content:</label>
                <input placeholder=" type your content" name='content' type="text" onChange={handleChange} id='02' />
                <label>"catagory"
                    <select name="catagory">
                        <option value="entertainment"> entertainment</option>
                        <option value="news">news</option>
                    </select>
                </label>
                <p>Title:{formData.title}</p>
                <p>Content: {formData.content}</p>
                <button type="submit">submit</button>
              
                
             </form>
        </div>
    )
}
