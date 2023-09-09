import express from "express";
import bcrypt from "bcrypt";
import mongoose from "mongoose";
import { validationResult } from "express-validator";
import { registrationValidation } from "./middlewares/validations.js";
import jwt from "jsonwebtoken";
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

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    mongoose.connect(process.env.MONGODB_URI);
    const secretKey = process.env.JWT_SECRET_KEY;
    const user = await User.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ userId: user._id, email: user.email }, secretKey, {
      expiresIn: "1h",
    });

    res.cookie("authToken", token, { httpOnly: true, maxAge: 3600000 }); // 1 hour
    res
      .status(200)
      .json({ message: "Login successful", user: { email: user.email } });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Login failed" });
  }
});

router.get("/logout", (req, res) => {
  res.clearCookie("authToken").json({ message: "Logout successful" });
});

module.exports = router;
