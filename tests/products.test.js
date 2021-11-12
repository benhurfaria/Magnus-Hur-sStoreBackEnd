import '../src/setup.js'
import supertest from "supertest";
import app from "../src/app";

describe('GET /products', () => {

    test('returns status 200 for get products', async() => {
        const result = await supertest(app).get('/products');
        const status = result.status
        expect(status).toEqual(200)
    })

})

describe('POST /products', () => {

    test('returns status 201 for valid body', async() => {
        const result = await supertest(app).post('/products').send({
            name: 'Monitor', 
            price: 800,
            imgeUrl: "https://upload.wikimedia.org/wikipedia/commons/9/9a/Gull_portrait_ca_usa.jpg", 
            descrition: "Quack",
        });
        const status = result.status;
        expect(status).toEqual(201)
    });

    test('returns status 400 for invalid body', async() => {
        const result = await supertest(app).post('/products').send({
            name: 'Monitor', 
            price: 800,
            imgeUrl: "https://upload.wikimedia.org/wikipedia/commons/9/9a/Gull_portrait_ca_usa.jpg",
        });
        const status = result.status;
        expect(status).toEqual(400)
    });

})

describe('GET /products/:id', () => {

    test('returns status 404 for invalid id', async() => {
        const result = await supertest(app).get('/products/50');
        const status = result.status
        expect(status).toEqual(404)
    })

    test('returns status 200 for valid id', async() => {
        const result = await supertest(app).get('/products/1');
        const status = result.status
        expect(status).toEqual(200)
    })
})