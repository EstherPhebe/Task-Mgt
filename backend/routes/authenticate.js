const express = require("express");
const { register, login, logout } = require("../controllers/authenticate");
const {
  validateUserRegistrationSchema,
  validateUserLoginSchema,
  validateUser,
} = require("../middleware/validateUser");

const router = express.Router();

//Registration
router.post(
  "/register",
  [validateUserRegistrationSchema, validateUser],
  register
);
//Login
router.post("/login", [validateUserLoginSchema, validateUser], login);
// Logout
router.post("/logout", logout);

module.exports = router;
