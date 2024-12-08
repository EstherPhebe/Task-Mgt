const express = require("express");

const { register, login, logout } = require("../controllers/authenticate");

const router = express.Router();

//Registration
router.post("/register", register);
//Login
router.post("/login", login);
// Logout
router.post("/logout", logout);

module.exports = router;
