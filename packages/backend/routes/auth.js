const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");


router.get("/test", (req, res) => {
  res.json({ message: "Hello, this is a test API!" });
});

router.post("/register", async (req, res) => {
  try {
    const { name, username, email, password, role } = req.body;

    // Validate required fields
    if (!name || !username || !email || !password) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(400).json({ message: "Username or Email already taken." });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const newUser = new User({
      name,
      username,
      email,
      password: hashedPassword,
      role: role || "user",
    });

    await newUser.save();
    res.status(201).json({ message: "User registered successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    console.log(`Login attempt for user: ${username}`);

    const user = await User.findOne({ username });
    if (!user) {
      console.error("User not found");
      return res.status(400).json({ message: "User not found" });
    }

    if (!user.isActive) {
      console.error("User not active");
      return res.status(400).json({ message: "User is not active right now, please wait / contact admin for activation." });
    }

    console.log(user);

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.error("Invalid credentials");
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "30m" }
    );

    console.log(`Login successful for ${username}, Role: ${user.role}`);
    res.json({ token, role: user.role, isActive: user.isActive });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;