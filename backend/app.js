import express from "express";
import dotenv from "dotenv";
import { MongoClient, ServerApiVersion } from "mongodb";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const uri = process.env.MONGODB_URI;

// START SERVER //
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// CONNECT TO MONGODB //
async function connectToMongoDB() {
  const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
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
connectToMongoDB();
