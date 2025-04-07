const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../database/models");

const { user } = db.sequelize.models;
const ONE_HOUR = 3600000;

//Registration
const register = async (req, res) => {
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
      return res.status(201).json(`Welcome ${newUser.name}`);
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

//Login
const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const userLogin = await user.findOne({ where: { email } });
    if (!userLogin) {
      return res.status(400).json({ error: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, userLogin.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid credentials" });
    } else {
      const token = jwt.sign({ id: userLogin.id }, process.env.JWT_SECRET, {
        expiresIn: "2h",
      });

      res
        .cookie("token", token, {
          maxAge: ONE_HOUR,
          httpOnly: true,
          sameSite: "Lax", //check the docs
          secure: "development",
        })
        .status(200)
        .json({ message: "Login successful" });
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

//Logout
const logout = async (req, res) => {
  res
    .clearCookie("token", {
      maxAge: ONE_HOUR,
      httpOnly: true,
      secure: "development",
    })
    .status(200)
    .json({ message: "You've been logged out" });
};

const forgotPassword = async (req, res) => {
  const { email } = red.body;
  try {
    const userForgotPassword = await user.findOne({
      where: { email },
    });
    if (!userForgotPassword) {
      return res.status(404).json({ error: "User not found." });
    }
  } catch (error) {}
};

module.exports = { register, login, logout };
