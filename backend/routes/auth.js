const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  // console.log(req.headers)
  
  const token = req.header('Authorization').replace('Bearer ', '');
  console.log(token)
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded)
    req.userId = decoded.id;
    next();
  } catch (err) {
    res.status(401).json({ error: 'Unauthorized' });
  }
};

module.exports = auth;