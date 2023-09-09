import express from "express";

const router = express.Router();

router.get("/hello", (req, res) => {
  res.json({ message: "Hello, Express with ES6!" });
});

module.exports = router;
