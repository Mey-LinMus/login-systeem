const express = require("express");
const { MongoClient, ObjectID } = require("mongodb");
const bcrypt = require("bcrypt");
require("dotenv").config();

const app = express();
const port = 8080;

app.use(express.json());

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


function authenticateUser(req, res, next) {
  if (!req.session || !req.session.userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  next();
}


app.get("/", async (req, res) => {
  try {
    const db = await connectToDatabase();
    res.send("Connected to the MongoDB database");
  } catch (error) {
    res.status(500).send("Error connecting to the database");
  }
});


app.post("/register", async (req, res) => {
  const { username, password, role } = req.body;

  try {
    const db = await connectToDatabase();
    const usersCollection = db.collection("Users");


    const existingUser = await usersCollection.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "Username already exists" });
    }


    const hashedPassword = await bcrypt.hash(password, 10);

   
    const result = await usersCollection.insertOne({
      username,
      password: hashedPassword,
      role: role || "user", 
    });

    res.status(201).json({ message: "User registered successfully", userId: result.insertedId });
  } catch (error) {
    console.error("Error registering user", error);
    res.status(500).json({ message: "Internal server error" });
  }
});


app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const db = await connectToDatabase();
    const usersCollection = db.collection("Users");

    
    const user = await usersCollection.findOne({ username });

    if (!user) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

   
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (passwordMatch) {
   
      req.session.userId = user._id;
      res.json({ message: "Login successful", role: user.role });
    } else {
      res.status(401).json({ message: "Invalid username or password" });
    }
  } catch (error) {
    console.error("Error logging in", error);
    res.status(500).json({ message: "Internal server error" });
  }
});


app.get("/user", authenticateUser, async (req, res) => {
  try {
    const db = await connectToDatabase();
    const usersCollection = db.collection("Users");

 
    const user = await usersCollection.findOne({ _id: ObjectID(req.session.userId) });

    if (user) {
      res.json({ username: user.username, role: user.role });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error("Error retrieving user information", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.listen(port, () => {
  console.log(`API is running at http://localhost:${port}`);
});
