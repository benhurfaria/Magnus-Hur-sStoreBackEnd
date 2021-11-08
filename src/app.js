import express from 'express';
import cors from 'cors';
import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';
import connection from './database.js';

const app = express();
app.use(cors());
app.use(express.json());

app.get('/teste', async (req, res) => {

});



app.get('/oi', async (req,res)=>{
    try{
        console.log("OI");
        res.status(200).send("OI");
    }catch(err){
        console.log(err);
        res.sendStatus(500);
    }
});



export default app;