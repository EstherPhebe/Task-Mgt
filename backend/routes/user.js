const express = require("express");
const auth = require("../middleware/auth");

const { getUser } = require("../controllers/user");

const router = express.Router();

//GetUserDetails
router.get("/user", auth, getUser);

module.exports = router;
