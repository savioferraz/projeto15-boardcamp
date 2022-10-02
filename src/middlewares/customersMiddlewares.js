import { connection } from "../db/db.js";
import { customerSchema } from "../schemas/customersSchemas.js";

async function insertCustommerMiddleware(req, res, next) {
  const customerData = req.body;

  const sameCpf = await connection.query(
    "SELECT * FROM customers WHERE cpf=$1",
    [customerData.cpf]
  );

  const validation = customerSchema.validate(customerData, {
    abortEarly: false,
  });

  if (sameCpf.rows.length !== 0) {
    res.sendStatus(409);
    return;
  }

  if (validation.error) {
    const errors = validation.error.details.map((error) => error.message);
    res.status(400).send(errors);
    return;
  }

  next();
}

export { insertCustommerMiddleware };
