import { connection } from "../db/db.js";

const listGames = async (req, res) => {
  try {
    const gameFilter = req.query.name;

    if (gameFilter) {
      const games = await connection.query(
        `SELECT * FROM games WHERE name LIKE $1;`,
        [gameFilter]
      );
      res.status(201).send(games.rows);
    } else {
      const games = await connection.query("SELECT * FROM games;");
      res.status(200).send(games.rows);
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const insertGame = async (req, res) => {
  try {
    const gameData = req.body;

    console.log(gameData);
    await connection.query(
      `INSERT INTO games (name, image, "stockTotal", "categoryId", "pricePerDay") VALUES ($1, $2, $3, $4, $5)`,
      [
        gameData.name,
        gameData.image,
        gameData.stockTotal,
        gameData.categoryId,
        gameData.pricePerDay,
      ]
    );
    res.sendStatus(201);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

export { listGames, insertGame };
