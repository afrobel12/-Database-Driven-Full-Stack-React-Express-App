//dotenv setup
import dotenv from "dotenv"
dotenv.config()

//pg setup
import pg from "pg"
export const db = new pg.Pool({
    connectionString: process.env.DATABASE_URL,
})

//create table for entertainment
db.query(`CREATE TABLE IF NOT EXISTS entertainment (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255),
    content VARCHAR(255)
)`)

//insert data to entertainment
db.query(`INSERT INTO entertainment (title, content)
VALUES
('Kenneth Mitchell: Star Trek and Marvel actor dies aged 49', 'Mitchell died after battling ALS - also known as motor neurone disease - for more than five years. His family described him as an inspirational work of art to all the hearts he touched.'),
('Graham Norton to leave Virgin Radio weekend show', 'The presenter has spent 13 years on the airwaves - spending 10 years with Radio 2 ahead of Virgin Radio.'),
('Oppenheimer continues winning streak as film dominates at SAG Awards ahead of Oscars', 'Christopher Nolans biopic won best film cast, while Cillian Murphy and Robert Downey Jr both scooped prizes at the red carpet event, which followed the longest actors strike in history and is a key indicator for next months Oscars.')
`)

//create table for news
db.query(`CREATE TABLE IF NOT EXISTS news (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255),
    content VARCHAR(255)

)`)

//insert data to news
db.query(`INSERT INTO news (title, content)
VALUES
('UK weather: Threat of flooding as heavy rain forecast for parts of country', 'There is the chance of homes and businesses being inundated by rising water levels, which could also see some road closures, while surface spray is likely to lead to difficult driving conditions.'),
('Worthing: Police appeal after hundreds of teens turn up to house party', 'Sussex Police had to break up an out-of-control party after hundreds of teenagers turned up to a home in Worthing following an invitation reportedly being shared on Facebook.'),
('Mondays national newspaper front pages', 'Sky News takes a look at the stories making the headlines on Mondays national newspaper front pages.')
`)
