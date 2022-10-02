import { connection } from "../db/db.js";
import { categorieSchema } from "../schemas/categoriesSchemas.js";

async function insertCategorieMiddlware(req, res, next) {
  const categorieName = req.body;

  const sameCategorie = await connection.query(
    "SELECT * FROM categories WHERE name=$1",
    [categorieName.name]
  );

  const validation = categorieSchema.validate(categorieName, {
    abortEarly: false,
  });

  if (sameCategorie.rows.length !== 0) {
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

export { insertCategorieMiddlware };
