import express from "express";
import dotenv from "dotenv";
import { connection } from "./db/db.js";

dotenv.config();

const server = express();

server.get("/", async (req, res) => {
  const customers = await connection.query("SELECT * FROM customers;");

  console.log(customers);
  res.status(200).send(customers);
});

server.listen(process.env.PORT, () =>
  console.log(`Listening on port ${process.env.PORT}`)
);
