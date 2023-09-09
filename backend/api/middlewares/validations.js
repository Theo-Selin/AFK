import { check } from "express-validator";

const registrationValidation = [
  check("email")
    .isEmail()
    .withMessage("Please provide a valid email address.")
    .normalizeEmail(), // Sanitize and normalize the email address

  check("password")
    .isLength({ min: 6 }) // Minimum password length
    .withMessage("Password must be at least 6 characters long."),
];

export { registrationValidation };
