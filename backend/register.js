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

const isStrongPassword = (password) => {
  return password.length >= 8;
};

router.post("/register", async (req, res) => {
  const { email, password, role } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Please enter a valid email" });
  }

  if (!isValidEmail(email)) {
    return res.status(400).json({ message: "Please enter a valid email address" });
  }

  if (!isStrongPassword(password)) {
    return res.status(400).json({ message: "Password is not strong enough" });
  }

  try {
    const db = await connectToDatabase();
    const usersCollection = db.collection("Users");

    const existingUser = await usersCollection.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await usersCollection.insertOne({
      email,
      password: hashedPassword,
      role: role || "user",
    });

    res.status(201).json({
      message: "User registered successfully",
      userId: result.insertedId,
    });
  } catch (error) {
    console.error("Error registering user", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

module.exports = router;
