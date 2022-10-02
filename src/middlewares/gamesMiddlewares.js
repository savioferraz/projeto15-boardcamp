import { connection } from "../db/db.js";
import { gameSchema } from "../schemas/gamesSchemas.js";

async function insertGameMiddleware(req, res, next) {
  const gameData = req.body;

  const sameGameName = await connection.query(
    "SELECT * FROM games WHERE name=$1",
    [gameData.name]
  );

  const validation = gameSchema.validate(gameData, {
    abortEarly: false,
  });

  if (sameGameName.rows.length !== 0) {
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

export { insertGameMiddleware };
