import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  // Additional user properties can be added here
});

const User = mongoose.model("User", userSchema);

export default User;
