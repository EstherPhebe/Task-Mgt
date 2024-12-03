const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../database/models");

const { user } = db.sequelize.models;
const ONE_HOUR = 3600000;

const router = express.Router();

router.post("/register", async (req, res) => {
  const { email, name, password } = req.body;
  try {
    const existingUser = await user.findOne({ where: { email } });
    if (existingUser) {
      return res.status(409).json({ error: "Email already exists. Log In" });
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await user.create({
        email,
        name,
        password: hashedPassword,
      });
      res.status(201).json(`Welcome ${newUser.name}`);
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const userLogin = await user.findOne({ where: { email } });
    if (!userLogin) return res.status(404).json({ error: "User not found" });

    const isMatch = await bcrypt.compare(password, userLogin.password);
    if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

    const token = jwt.sign({ id: userLogin.id }, process.env.JWT_SECRET, {
      expiresIn: "2h",
    });
    console.log(userLogin.id);

    res
      .cookie("token", token, {
        maxAge: ONE_HOUR,
        httpOnly: true,
        secure: "development",
      })
      .status(200)
      .json({ message: "Welcome" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.post("/logout", async (req, res) => {
  res
    .clearCookie("token", {
      maxAge: ONE_HOUR,
      httpOnly: true,
      secure: "development",
    })
    .status(200)
    .json({ message: "You've been logged out" });
});

module.exports = router;
