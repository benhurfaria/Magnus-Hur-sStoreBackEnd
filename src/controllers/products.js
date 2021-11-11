import connection from "../database.js";
import { productSchema } from "../validation/products.js";

async function getProducts(req, res) {
    const {
        ordenacao
    } = req.query;

    let query = 'SELECT * FROM products '

    if (ordenacao === 'alpha') {
        query += 'ORDER BY name ASC'
    }

    if (ordenacao === 'lowerPrice') {
        query += 'ORDER BY price ASC'
    }

    if (ordenacao === 'higherPrice') {
        query += 'ORDER BY price DESC'
    }

    try {
        const products = await connection.query(`${query};`);

        res.status(200).send(products.rows);

    } catch (error) {
        return res.status(500).send({message: "O banco de dados está offline"});
    }
}

async function postProducts(req, res) {
    const {
        name,
        price,
        imgeUrl,
        descrition,
    } = req.body;

    const validate = productSchema.validate({
        name,
        price,
        imgeUrl,
        descrition,
    })

    if (validate.error) {
        res.status(400).send(validate.error.message);
        return
    }

    try {

        await connection.query(`
            INSERT INTO products
                (name, price, "imgeUrl", descrition)
            VALUES
                ($1, $2, $3, $4);
        `, [name, price, imgeUrl, descrition])
        
        return res.sendStatus(201);

    } catch (error) {
        return res.status(500).send({message: "O banco de dados está offline"});
    }
}

export {
    getProducts,
    postProducts,
}