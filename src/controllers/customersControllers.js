import { connection } from "../db/db.js";

const listCustomers = async (req, res) => {
  try {
    const customers = await connection.query("SELECT * FROM customers;");
    res.status(200).send(customers.rows);
  } catch (error) {
    res.sendStatus(400);
  }
};

const filterCustomer = async (req, res) => {
  const customerId = req.params.id;
  try {
    const customer = await connection.query(
      "SELECT * FROM customers WHERE id=$1;",
      [customerId]
    );
    res.status(200).send(customer.rows);
  } catch (error) {
    res.status(404).send(error.message);
  }
};

const insertCustomer = async (req, res) => {
  try {
    const customerData = req.body;
    await connection.query(
      `INSERT INTO customers (name, phone, cpf, birthday) VALUES ($1, $2, $3, $4)`,
      [
        customerData.name,
        customerData.phone,
        customerData.cpf,
        customerData.birthday,
      ]
    );
    res.sendStatus(201);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

export { listCustomers, filterCustomer, insertCustomer };
