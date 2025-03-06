import mysql from "mysql";
import dotenv from "dotenv";

dotenv.config(); // variables de entorno

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user:process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

db.connect((err) => {
  if(err) {
    console.error("Database connection failed: ", err);
    return;
  }
  console.log("Connection to MySQL");
});

export default db;
