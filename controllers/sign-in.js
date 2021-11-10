import connection from "../src/database.js";
import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';
import {signInSchema} from "../schemas/userSchema.js"

async function signIn(req,res){
    const validate = signInSchema.validate(req.body);

    if(validate.error){
        res.sendStatus(400);
        return;
    }

    const {
        email,
        password,
    }=req.body;
   
    try{
        console.log("OII");
        const user = await connection.query(`
            SELECT * FROM usuario WHERE email = $1;
        `, [email]);

        console.log("OII2");
        if(user.rowCount === 0){
            res.sendStatus(401);
            return;
        }
        console.log("OII");
        const encryptedPassword = user.rows[0].password;
        if(!bcrypt.compareSync(password, encryptedPassword)){
            res.sendStatus(401);
            return;
        }

        const token = uuid();
        console.log(token);
        await connection.query(`
            INSERT INTO sessions ("idUser", token) VALUES ($1, $2);
        `, [user.rows[0].id, token]);

        res.status(200).send({
            token,
        });

    }catch(error){

    }
}

export {
    signIn,
}