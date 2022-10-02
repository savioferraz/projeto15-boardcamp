import { connection } from "../db/db.js";

const listCategories = async (req, res) => {
  try {
    const categories = await connection.query("SELECT * FROM categories;");
    res.status(200).send(categories.rows);
  } catch (error) {
    res.sendStatus(400);
  }
};

const insertCategorie = async (req, res) => {
  try {
    const categorieName = req.body.name;
    await connection.query("INSERT INTO categories (name) VALUES ($1);", [
      categorieName,
    ]);
    res.sendStatus(201);
  } catch (error) {
    res.status(400).send(error);
  }
};

export { listCategories, insertCategorie };
