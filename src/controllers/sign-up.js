import connection from "../database.js";
import { signUpSchema } from "../../schemas/userSchema.js";
import bcrypt from 'bcrypt';

async function signUp(req, res){
    
    const validation = signUpSchema.validate(req.body);

    if(validation.error){
        res.sendStatus(400);
        return;
    }

    const {
        name, 
        email,
        password,
    } = req.body;

    const encryptedPassword = bcrypt.hashSync(password, 10);

    try{
        await connection.query(`
            INSERT INTO usuario (name, email, password) VALUES ($1, $2, $3);
        `, [name, email, encryptedPassword]);

        res.sendStatus(200);

        return;

    } catch (error){
        if(error.code === "23505"){
            res.sendStatus(409);
            return;
        }
        res.sendStatus(500);
        return;
    }

    
}

export {
    signUp,
}