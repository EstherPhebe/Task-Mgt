const { rateLimit } = require("express-rate-limit");

const limiter = rateLimit({
  windowMs: 5 * 60 * 1000,
  limit: 6,
  message: "Too many reqests, try again in 5 mins",
  statusCode: 429,
});

module.exports = { limiter };
