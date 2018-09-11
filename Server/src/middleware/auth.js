const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization;
    jwt.verify(token, "The_Secret_String");
    next();
  } catch (error) {
    res.status(401).json({
      message: "Authentication Failed!, No Token "
    });
  }

};
