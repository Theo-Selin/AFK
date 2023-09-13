import express from "express";
import bcrypt from "bcrypt";
import mongoose from "mongoose";
import { validationResult } from "express-validator";
import { registrationValidation } from "./middlewares/validations.js";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import User from "../models/user.js";

mongoose.connect(process.env.MONGODB_URI);

const secretKey = process.env.JWT_SECRET_KEY;
const router = express.Router();
router.use(cookieParser());

// CREATE USER //
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
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });
    // Save the user document to the database
    const created = await newUser.save();
    // Respond with a success message
    res.status(201).json({
      message: "Registration successful",
      user: {
        username: created.username,
        email: created.email,
      },
    });
  } catch (err) {
    console.error("Registration error:", err);
    res.status(500).json({ message: "Registration failed" });
  }
});

// LOGIN USER //
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    // Create a new JWT token if the password is correct
    const token = jwt.sign({ userId: user._id, email: user.email }, secretKey, {
      expiresIn: "1h",
    });
    // Send the JWT token as an HTTP-only cookie
    res.cookie("authToken", token, { httpOnly: true, maxAge: 3600000 }); // 1 hour
    res
      .status(200)
      .json({
        message: "Login successful",
        user: { email: user.email, username: user.username },
      });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Login failed" });
  }
});

// PROTECTED ROUTE //
router.get("/protected", (req, res) => {
  try {
    const token = cookieParser.JSONCookies(req.cookies).authToken;
    const decodedToken = jwt.verify(token, secretKey);
    req.user = decodedToken;
    res.status(200).json({ message: "Access granted", user: decodedToken });
  } catch (error) {
    res.status(401).json({ message: "Unauthorized" });
    console.error(error);
  }
});

// GET USER //
router.get("/user", (req, res) => {
  const token = cookieParser.JSONCookies(req.cookies).authToken;
  const decodedToken = jwt.verify(token, secretKey);
  req.user = decodedToken;
  res.status(200).json({ user: req.user });
});

// LOGOUT USER //
router.get("/logout", (req, res) => {
  res.clearCookie("authToken").json({ message: "Logout successful" });
});

module.exports = router;
