import express from "express";
import dotenv from "dotenv";

const app = express();
const port = process.env.PORT || 3000;
dotenv.config();

const { MongoClient } = require("mongodb");

const uri = process.env.MONGODB_URI;

async function connectToMongoDB() {
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  try {
    await client.connect();
    console.log("Connected to MongoDB");
    // You can now perform database operations using client
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  } finally {
    // Ensure the client is closed when you're done
    await client.close();
  }
}

// Call connectToMongoDB to establish the connection.
connectToMongoDB();

app.get("/message", (req, res) => {
  res.json({ message: "Hello, Express with ES6!" });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
