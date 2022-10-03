import { connection } from "../db/db.js";
import { rentalSchema } from "../schemas/rentalSchemas.js";

async function insertRentalMiddleware(req, res, next) {
  const rentalData = req.body;

  const customerData = await connection.query(
    `SELECT * FROM customers WHERE id=$1;`,
    [rentalData.customerId]
  );

  const gameData = await connection.query(`SELECT * FROM games WHERE id=$1;`, [
    rentalData.gameId,
  ]);

  const validation = rentalSchema.validate(rentalData, {
    abortEarly: false,
  });

  if (customerData.rows.length === 0) {
    res.status(400).send("Invalid customer");
    return;
  }

  if (gameData.rows.length === 0) {
    res.status(400).send("Invalid game");
    return;
  }

  if (validation.error) {
    const errors = validation.error.details.map((error) => error.message);
    res.status(400).send(errors);
    return;
  }

  next();
}

async function deleteRentalMiddleware(req, res, next) {
  const rentalId = req.params.id;

  const rentalData = await connection.query(
    `SELECT * FROM rentals WHERE id=$1;`,
    [rentalId]
  );

  if (rentalId !== rentalData.rows[0].id) {
    res.status(404).send("Invalid entry");
    return;
  }

  if (!rentalData.rows[0].returnDate) {
    console.log(rentalData.rows[0].id, rentalId);
    res.status(400).send("Can't delete open rentals");
    return;
  }

  next();
}

export { insertRentalMiddleware, deleteRentalMiddleware };
