import express from "express";

const app = express();
const port = process.env.PORT || 3000;

app.get("/message", (req, res) => {
  res.json({ message: "Hello, Express with ES6!" });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
