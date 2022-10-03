import dayjs from "dayjs";
import { connection } from "../db/db.js";

const listRentals = async (req, res) => {
  try {
    const rentals = await connection.query(
      ` SELECT 
            rentals.*, 
            customers.id AS "customerId", customers.name AS "customerName",
            games.id AS "gameId", games.name AS "gameName", games."categoryId",
            categories.name AS "categoryName"    
        FROM rentals 
        JOIN customers 
        ON rentals."customerId" = customers.id
        JOIN games
        ON rentals."gameId" = games.id
        JOIN categories
        ON games."categoryId" = categories.id;`
    );
    res.status(200).send(rentals.rows);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const insertRental = async (req, res) => {
  try {
    const rentalData = req.body;
    const rentDate = dayjs().format("YYYY-MM-DD");
    const originalPrice =
      (
        await connection.query(
          `SELECT games."pricePerDay" FROM games WHERE games.id=$1;`,
          [rentalData.gameId]
        )
      ).rows[0].pricePerDay * rentalData.daysRented;

    await connection.query(
      ` INSERT INTO rentals ("customerId", "gameId", "rentDate", "daysRented", "originalPrice")
        VALUES ($1, $2, $3, $4, $5);`,
      [
        rentalData.customerId,
        rentalData.gameId,
        rentDate,
        rentalData.daysRented,
        originalPrice,
      ]
    );
    res.sendStatus(200);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const endRental = async (req, res) => {
  try {
    const rentalId = req.params.id;
    const returnDate = dayjs().format("YYYY-MM-DD");
    const rentDate = (
      await connection.query(`SELECT "rentDate" FROM rentals WHERE id=$1`, [
        rentalId,
      ])
    ).rows[0].rentDate
      .toISOString()
      .substring(0, 10);
    const delayFee = (
      await connection.query(`SELECT "delayFee" FROM rentals WHERE id=$1`, [
        rentalId,
      ])
    ).rows[0].delayFee;

    const days = rentDate.diff(rentDate);

    console.log(days);
    res.sendStatus(200);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const removeRental = async (req, res) => {
  try {
    const rentalId = req.params.id;

    await connection.query("DELETE FROM rentals WHERE id=$1", [rentalId]);
    res.sendStatus(200);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

export { listRentals, insertRental, endRental, removeRental };
