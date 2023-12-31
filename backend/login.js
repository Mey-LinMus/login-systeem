const express = require("express");
const { MongoClient } = require("mongodb");
const bcrypt = require("bcrypt");
require("dotenv").config();

const router = express.Router();

const url = process.env.URL;
const dbName = "ExpertLab";

async function connectToDatabase() {
  try {
    const client = new MongoClient(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    await client.connect();
    console.log("Connected to the database");
    return client.db(dbName);
  } catch (err) {
    console.error("Error connecting to the database", err);
    throw err;
  }
}

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!isValidEmail(email)) {
    return res.status(400).json({ message: "Invalid email format" });
  }

  try {
    const db = await connectToDatabase();
    const usersCollection = db.collection("Users");

    const user = await usersCollection.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (passwordMatch) {
      res.json({
        message: "Login successful",
        role: user.role,
      });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    console.error("Error logging in", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

module.exports = router;
