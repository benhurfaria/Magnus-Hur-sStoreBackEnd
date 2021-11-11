import '../setup.js';
import app from "../app.js";
import supertest from "supertest";
import connection from "../database.js";
import { validBodyFactorySignup, invalidBodyFactorySignup } from "../factories/signup.factory.js";

afterAll(async ()=>{
    connection.end();
});

describe("POST /sign-up", ()=>{
    const validBody = validBodyFactorySignup();
    const invalidBody = invalidBodyFactorySignup();
    
    afterAll(async () =>{
        console.log(validBody.email);
        await connection.query(`
            DELETE FROM usuario;
        `);
    });
    
    console.log(validBody.email);
    test("returns 400 there is some inconsistent information", async ()=>{
        const result = await supertest(app).post('/sign-up').send(invalidBody);

        expect(result.status).toEqual(400);
    });
    console.log(validBody.email);
    test("returns 200 when send valid information", async ()=>{
        const result = await supertest(app).post('/sign-up').send(validBody);

        expect(result.status).toEqual(200);
    });
    console.log(validBody.email);
    
});