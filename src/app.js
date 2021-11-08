import express from 'express';
import cors from 'cors';
import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';
import connection from './database.js';

const app = express();
app.use(cors());
app.use(express.json());


app.get("/oi", (req,res)=>{
    res.send("OI");
});




export default app;