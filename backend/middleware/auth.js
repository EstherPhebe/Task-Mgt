const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const token = req.header("cookie").replace("token=", "");
  // const token = req.cookies.token; - using the cookie-parser package
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user_id = decoded.id;
    next();
  } catch (err) {
    res.status(401).json({ error: "Unauthorized" });
  }
};

module.exports = auth;
