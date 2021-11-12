import express from "express";
import cors from "cors";
import { signIn } from "./controllers/sign-in.js";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/teste", async (req, res) => {
  try {
    res.status(200).send("ola");
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.get("/oi", async (req, res) => {
  try {
    res.status(200).send("ola mundo");
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.get("/xablau", (req, res) => {
  res.sendStatus(500);
});

app.post("/sign-in", signIn);

export default app;
