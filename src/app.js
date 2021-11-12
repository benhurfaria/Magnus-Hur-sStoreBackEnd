import express from 'express';
import cors from 'cors';
// import bcrypt from 'bcrypt';
// import { v4 as uuid } from 'uuid';
import connection from './database.js';

const app = express();
app.use(cors());
app.use(express.json());

app.post('/removefromcart',async(req, res)=>{
  const { id } = req.body;  
  try {  
      console.log(id);
      res.status(200).send({id});
  } catch (error) {
      console.log(error);
      res.sendStatus(500);
  }
});

app.get('/cartitens/:id', async (req, res) => {
    const id = Number(req.params.id);
    try {
        const cartItens = await connection.query(`SELECT cart.id AS "cartId", "idUser", "cartProducts".id AS "cartProductsId", "idProducts", name, "unitaryPrice", qtd, "imgeUrl", descrition 
        FROM cart JOIN "cartProducts" ON cart.id = "cartProducts"."idCart"                                                                                       
        JOIN products ON "cartProducts"."idProducts"=products.id WHERE cart."idUser"=$1;
        `, [id]);
        if(cartItens.rowCount === 0){
            return res.status(404).send('Não existem itens no carrinho');
        }
        let qtd = 0;
        cartItens.rows.forEach((iten)=> { qtd+= iten.qtd; });
        const itensRows ={
            qtd, 
            itens: cartItens.rows
        }
        res.status(200).send(itensRows);
        
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
})




export default app;