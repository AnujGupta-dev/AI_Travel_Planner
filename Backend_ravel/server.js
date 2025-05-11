import express from 'express';
import dotenv from 'dotenv'
import dbconnect from './config/database.js'
import router from './routes/userRoutes.js';
import cors from 'cors'

const app = express();

dotenv.config()
const PORT = process.env.PORT || 4000 ;

app.use(cors)
app.use(cors({
    origin: 'https://ai-travel-planner-2kla.onrender.com',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
}))

app.use(express.json());
app.use("/api" , router)


dbconnect();

app.get('/',(req,res)=>{
    res.send("Home page baby")
})

app.listen(PORT , ()=>{
    console.log(`server is ready at ${PORT}`);
    
})