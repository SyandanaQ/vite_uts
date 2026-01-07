import mysql from "mysql2";

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "dbpskl",
});

db.connect((err) => {
  if (err) {
    console.error("Database error:", err);
  } else {
    console.log("MySQL connected");
  }
});

export default db;
