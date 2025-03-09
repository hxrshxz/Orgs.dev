import express, { json } from 'express'
import cors from 'cors'
import axios from 'axios'
import fs from 'fs'
const app = express()

app.use(cors())

app.listen(8000,()=>{
    console.log("Server is running on port 8000")
})

app.get('/organizations', async (req, res) => {
    try {
        const response = fs.readFileSync('organizations.json','utf-8');
        res.json(JSON.parse(response)); // Send only the data part
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching data');
    }
});

app.get('/organizations/:year',async(req,res)=>{
    const year = req.params.year
    const response = fs.readFileSync('organizations.json','utf-8')
    const data = JSON.parse(response)
    const orgs = data.filter(org => org.years === year)
    res.send(orgs)
})

// app.get('/organizations',(req,res)=>{
//     res.send("orgs coming soon")
// })