const express = require("express");
const mysql = require("mysql2/promise");

const app = express();
const PORT = 5000;

// Connection pool: settings come from environment variables set in docker-compose.yml
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// Route 1: proves the web container is running
app.get("/", (req, res) => {
  res.send("App is running");
});

// Route 2: proves the web container can reach the database
app.get("/names", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM names");
    res.json(rows);
  } catch (err) {
    console.error("Database error:", err.message);
    res.status(500).json({ error: err.message });
  }
});

// Listen on all interfaces so Docker port mapping works
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});