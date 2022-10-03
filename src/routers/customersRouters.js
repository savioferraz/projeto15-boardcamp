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
router.put(
  "/customers/:id",
  insertCustommerMiddleware,
  customersControllers.updateCustomer
);

export default router;
