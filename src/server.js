import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import categoriesRouters from "./routers/categoriesRouters.js";
import gamesRouters from "./routers/gamesRouters.js";
import customersRouters from "./routers/customersRouters.js";

dotenv.config();

const server = express();
server.use(express.json());
server.use(cors());

server.use(categoriesRouters);
server.use(gamesRouters);
server.use(customersRouters);

server.listen(process.env.PORT, () =>
  console.log(`Listening on port ${process.env.PORT}`)
);
