import express from "express";
import * as rentalsControllers from "../controllers/rentalsControllers.js";
import { insertRentalMiddleware } from "../middlewares/rentalsMiddlewares.js";

const router = express.Router();

router.get("/rentals", rentalsControllers.listRentals);
router.post(
  "/rentals",
  insertRentalMiddleware,
  rentalsControllers.insertRental
);
router.post("/rentals/:id/return", rentalsControllers.endRental);
router.delete("/rentals/:id", rentalsControllers.removeRental);

export default router;
