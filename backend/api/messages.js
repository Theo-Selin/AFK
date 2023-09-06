import express from "express";

const app = express();

app.get("/message", (req, res) => {
  res.json({ message: "Hello, Express with ES6!" });
});
