import connection from "../database.js";

async function getProducts(req, res) {
    try {
        const products = await connection.query(`SELECT * FROM products;`);

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

    try {

        await connection.query(`
            INSERT INTO products
                (name, price, "imgeUrl", descrition)
            VALUES
                ($1, $2, $3, $4);
        `, [name, price, imgeUrl, descrition])
        
        return res.sendStatus(201);

    } catch (error) {
        console.log(error)
        return res.status(500).send({message: "O banco de dados está offline"});
    }
}

export {
    getProducts,
    postProducts,
}