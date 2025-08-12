// // backend/routes/authRoutes.js
// import express from "express";
// import bcrypt from "bcrypt";
// import User from "../models/User.js";
// import redis from "../config/redisClient.js";
// import { v4 as uuidv4 } from "uuid";

// const router = express.Router();

// router.post("/register", async (req, res) => {
//   const { email, password } = req.body;
  
//   if (!email || !password)
//     return res.status(400).json({ error: "Email and password required" });

//   const existingUser = await User.findOne({ email });
//   if (existingUser)
//     return res.status(400).json({ error: "Email already registered" });

//   const hashed = await bcrypt.hash(password, 10);
//   const user = new User({ email, password: hashed });
//   await user.save();

//   res.status(201).json({ message: "User registered successfully" });
// });


// backend/routes/auth.js

// import express from "express";
// import { register, login, logout, sessionCheck } from "../controllers/authController.js";
// import rateLimit from "express-rate-limit";
// const router = express.Router();
// router.post("/register", register);
// router.post("/login", login);
// router.post("/logout", logout);
// router.get("/session", sessionCheck);
// // Rate limiter for login
// const loginLimiter = rateLimit({
//   windowMs: 15 * 60 * 1000, // 15 minutes
//   max: 5, // max 5 attempts
//   message: "Too many login attempts, please try again after 15 minutes."
// });
// router.post("/login", loginLimiter, login);
// router.post("/register", register);
// export default router;


// backend/routes/authRoutes.js
// backend/routes/authRoutes.js



// import express from "express";
// import bcrypt from "bcrypt";
// import User from "../models/User.js";

// const router = express.Router();

// // REGISTER
// router.post("/register", async (req, res) => {
//   try {
//     const { name, email, password } = req.body;

//     if (!name || !email || !password) {
//       return res.status(400).json({ error: "All fields required" });
//     }

//     const exists = await User.findOne({ email });
//     if (exists) {
//       return res.status(400).json({ error: "User already exists" });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);
//     const user = await User.create({ name, email, password: hashedPassword });

//     res.status(201).json({ message: "User registered", user: { id: user._id, name: user.name, email: user.email } });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// // LOGIN
// router.post("/login", async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(400).json({ error: "Invalid credentials" });
//     }

//     const match = await bcrypt.compare(password, user.password);
//     if (!match) {
//       return res.status(400).json({ error: "Invalid credentials" });
//     }

//     // Save user in session
//     req.session.user = { id: user._id, name: user.name, email: user.email };

//     res.json({ message: "Logged in", user: req.session.user });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// // LOGOUT
// router.post("/logout", (req, res) => {
//   req.session.destroy(() => {
//     res.clearCookie("connect.sid");
//     res.json({ message: "Logged out" });
//   });
// });

// // CHECK SESSION
// router.get("/me", (req, res) => {
//   if (req.session && req.session.user) {
//     return res.json({ user: req.session.user });
//   }
//   res.status(401).json({ error: "Not logged in" });
// });

// export default router;

// backend/routes/authRoutes.js

import express from "express";
import bcrypt from "bcryptjs";         // <- bcryptjs (pure JS)
import User from "../models/User.js";

const router = express.Router();

// REGISTER
router.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) return res.status(400).json({ error: "Username and password required" });

    const existing = await User.findOne({ username });
    if (existing) return res.status(400).json({ error: "User already exists" });

    const hashed = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashed });
    await user.save();

    // optional: create session on register
    req.session.user = { id: user._id, username: user.username };

    res.status(201).json({ message: "User registered", user: { id: user._id, username: user.username } });
  } catch (err) {
    console.error("Register error:", err);
    res.status(500).json({ error: "Registration failed" });
  }
});

// LOGIN
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) return res.status(400).json({ error: "Username and password required" });

    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ error: "Invalid credentials" });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(400).json({ error: "Invalid credentials" });

    // Create session
    req.session.user = { id: user._id, username: user.username };

    res.json({ message: "Logged in", user: req.session.user });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: "Login failed" });
  }
});

// LOGOUT
router.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error("Logout error:", err);
      return res.status(500).json({ error: "Logout failed" });
    }
    res.clearCookie("connect.sid");
    res.json({ message: "Logged out" });
  });
});

// SESSION CHECK
router.get("/me", (req, res) => {
  if (req.session && req.session.user) return res.json({ user: req.session.user });
  return res.status(401).json({ error: "Not logged in" });
});

export default router;
