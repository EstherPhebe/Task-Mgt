const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const token = req.header("cookie").replace("token=", "");
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch (err) {
    res.status(401).json({ error: "Unauthorized" });
  }
};

module.exports = auth;
