const express = require("express");
const { register, login, logout } = require("../controllers/authenticate");
const {
  validateUserRegistrationSchema,
  validateUserLoginSchema,
  validateUser,
} = require("../middleware/validateUser");
const { limiter } = require("../middleware/ratelimit");

const router = express.Router();

//Registration
router.post(
  "/register",
  limiter,
  [validateUserRegistrationSchema, validateUser],
  register
);
//Login
router.post("/login", [validateUserLoginSchema, validateUser], limiter, login);
// Logout
router.post("/logout", logout);

module.exports = router;
