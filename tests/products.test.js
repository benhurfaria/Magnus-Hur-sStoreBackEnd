import "../src/setup.js";
import supertest from "supertest";
import app from "../src/app";
import connection from "../src/database.js";

import {
    validBodyFactoryProduct,
    invalidBodyFactoryProduct,
} from "../src/factories/products.factory.js";

beforeAll(async () => {
    const validBody = validBodyFactoryProduct();

    await connection.query(
        `
            INSERT INTO products
                (name, price, "imgeUrl", descrition)
            VALUES
                ($1, $2, $3, $4);
        `,
        [
            validBody.name,
            validBody.price,
            validBody.imgeUrl,
            validBody.descrition,
        ]
    );
});

afterAll(async () => {
    await connection.query(`DELETE FROM products;`);
});

describe("GET /products", () => {
    test("returns status 200 for get products", async () => {
        const result = await supertest(app).get("/products");
        const status = result.status;
        expect(status).toEqual(200);
    });
});

describe("POST /products", () => {
    const validBody = validBodyFactoryProduct();
    const invalidBody = invalidBodyFactoryProduct();

    test("returns status 201 for valid body", async () => {
        const result = await supertest(app).post("/products").send(validBody);
        const status = result.status;
        expect(status).toEqual(201);
    });

    test("returns status 400 for invalid body", async () => {
        const result = await supertest(app).post("/products").send(invalidBody);
        const status = result.status;
        expect(status).toEqual(400);
    });
});

describe("GET /products/:id", () => {
    let idValid;
    async function getIdParams() {
        idValid = await connection.query(`SELECT * FROM products;`);
        idValid = idValid.rows[0].id;
        return idValid;
    }
    
    test("returns status 404 for invalid id", async () => {
        let id = await getIdParams();
        
        const result = await supertest(app).get(`/products/${id+50}`);
        const status = result.status;
        expect(status).toEqual(404);
    });

    test("returns status 200 for valid id", async () => {
        let id = await getIdParams();

        const result = await supertest(app).get(`/products/${id}`);
        const status = result.status;
        expect(status).toEqual(200);
    });
});
