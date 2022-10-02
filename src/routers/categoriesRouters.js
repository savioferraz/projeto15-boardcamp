import express from "express";
import * as categoriesControllers from "../controllers/categoriesControllers.js";
import { insertCategorieMiddlware } from "../middlewares/categoriesMiddlewares.js";

const router = express.Router();

router.get("/categories", categoriesControllers.listCategories);
router.post(
  "/categories",
  insertCategorieMiddlware,
  categoriesControllers.insertCategorie
);

export default router;
