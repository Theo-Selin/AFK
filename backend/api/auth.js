import express from "express";
import bcrypt from "bcrypt";
import mongoose from "mongoose";
import { validationResult } from "express-validator";
import { registrationValidation } from "./middlewares/validations.js";
import User from "../models/user.js";

const router = express.Router();

router.post("/register", registrationValidation, async (req, res) => {
  try {
    // Validate the request using express-validator
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    // Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);

    // Create a new user document
    const newUser = new User({
      _id: new mongoose.Types.ObjectId(),
      email: req.body.email,
      password: hashedPassword,
    });

    // Save the user document to the database
    mongoose.connect(process.env.MONGODB_URI);
    await newUser.save();

    // Respond with a success message
    res.status(201).json({ message: "Registration successful" });
  } catch (err) {
    console.error("Registration error:", err);
    res.status(500).json({ message: "Registration failed" });
  }
});

module.exports = router;
