import connection from "../database.js";
import { signUpSchema } from "../../schemas/userSchema.js";
import bcrypt from 'bcrypt';

function signUp(req, res){

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
        connection.query(`
            INSERT INTO usuario (name, email, password) VALUES ($1, $2, $3);
        `, [name, email, encryptedPassword]);

        res.sendStatus(200);

        return;

    } catch (error){
        res.sendStatus(500);
        return;
    }

    
}

export {
    signUp,
}