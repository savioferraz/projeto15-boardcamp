import express from "express";
import * as customersControllers from "../controllers/customersControllers.js";
import { insertCustommerMiddleware } from "../middlewares/customersMiddlewares.js";

const router = express.Router();

router.get("/customers", customersControllers.listCustomers);
router.get("/customers/:id", customersControllers.filterCustomer);
router.post(
  "/customers",
  insertCustommerMiddleware,
  customersControllers.insertCustomer
);

export default router;
