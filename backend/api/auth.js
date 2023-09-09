import express from "express";
import { validationResult } from "express-validator";
import { registrationValidation } from "./middlewares/validations.js";

const router = express.Router();

router.post("/register", registrationValidation, (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  res.json({ message: "No errors" });
});

module.exports = router;
