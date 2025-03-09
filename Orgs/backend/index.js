import express from 'express'
import cors from 'cors'
import axios from 'axios'
const app = express()

app.use(cors())

app.listen(8000,()=>{
    console.log("Server is running on port 8000")
})

app.get('/', async (req, res) => {
    try {
        const response = await axios.get('https://api.gsocorganizations.dev/organizations.json');
        res.json(response.data); // Send only the data part
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching data');
    }
});

// app.get('/organizations',(req,res)=>{
//     res.send("orgs coming soon")
// })