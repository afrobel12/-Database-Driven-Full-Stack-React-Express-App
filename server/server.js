import  express, { request, response }  from "express";
import cors from 'cors'
import dotenv from "dotenv"
import pg from "pg"

const app = express()
app.use(cors())
app.use(express.json())
dotenv.config()

export const db = new pg.Pool({
    connectionString: process.env.DATABASE_URL
})

const PORT= " https://database-driven-full-stack-react-express.onrender.com" || "9664"
app.listen(PORT, () => {
    console.log(`server is running on : ${PORT}`)
})

app.get("/", (request, response) => {
    response.send("im here")
})
// get entertainment
app.get("/entertainment", async(request, response) => {
    const result = await db.query("SELECT * FROM entertainment")
    response.json(result.rows)
})
//get news
app.get("/news", async(request, response) => {
    const result = await db.query("SELECT * FROM news")
    response.json(result.rows)
})
//post entertainment
app.post("/entertainment", async (request,response) => {
    try {
        const {title, content} = request.body
        const newUser = await db.query("INSERT INTO entertainment (title, content) VALUES($1, $2) RETURNING *", [title, content]) 
        
        response.status(200).json(newUser.rows[0])
    } catch (err) {
        response.status(400).json({error: err.message})
    }
})
//post news
app.post("/news", async (request, response) => {
    try {
        const {title, content} = request.body
        const newNews = await db.query("INSERT INTO news (title, content) VALUES ($1, $2) RETURNING *", [title, content])

        response.status(200).json(newNews.rows[0])
    } catch (err) {
        response.status(400).json({error: err.message})
    }
})
// delete entertainment
app.delete("/entertainment/:id", async (request, response) => {
    try{
        const id = request.params.id
        const deleteEntertainment = await db.query("DELETE FROM entertainment WHERE id = $1 RETURNING *", [id])
        response.status(200).json({recordDeleted: deleteEntertainment.rows[0]})
    
    } catch(err) {
        response.status(500).json({error: err.message})
    }
})
// delete news
app.delete("/news/:id", async (request, response) => {
    try {
        const id = request.params.id
        const deleteNews = await db.query("DELETE FROM news WHERE id = $1 RETURNING *", [id])
        response.status(200).json({recordDeleted: deleteNews.rows[0]})
    } catch(err) {
        response.status(500).json({error: err.message})
    }
})
// put entertainmnet
app.put("/entertainment/:id", async (request, response) => {
    try {
        const id = request.params.id
        const {title, content} = request.body
        const updateUser = await db.query("UPDATE users SET name=$1, adress=$2 WHERE id=$3 RETURNING *", [title, content, id] )
        response.status(200).json({messaged : updateUser.rows[0]})

    } catch (err){
        res.status(500).json({error: err})
    }
})