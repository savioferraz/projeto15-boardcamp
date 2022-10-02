import express from "express";
import * as gamesControllers from "../controllers/gamesControllers.js";
import { insertGameMiddleware } from "../middlewares/gamesMiddlewares.js";

const router = express.Router();

router.get("/games", gamesControllers.listGames);
router.post("/games", insertGameMiddleware, gamesControllers.insertGame);

export default router;
