require("dotenv").config();

const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

app.get("/", (req, res) => {
  res.json({
    success: true,
    exchange: "Tata Exchange",
    message: "Tata Exchange API is running",
    version: "1.0.0"
  });
});

app.get("/api/v1/health", async (req, res) => {
  try {
    await pool.query("SELECT NOW()");

    res.json({
      success: true,
      exchange: "Tata Exchange",
      database: "connected",
      status: "healthy"
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      exchange: "Tata Exchange",
      database: "disconnected",
      status: "unhealthy"
    });
  }
});

app.get("/api/v1/info", (req, res) => {
  res.json({
    name: "Tata Exchange",
    version: "1.0.0",
    environment: process.env.NODE_ENV || "development",
    features: [
      "User Accounts",
      "Wallet",
      "Spot Trading",
      "Order Book",
      "Coin Listing",
      "Admin Panel"
    ]
  });
});

app.listen(PORT, () => {
  console.log(`Tata Exchange API running on port ${PORT}`);
});
