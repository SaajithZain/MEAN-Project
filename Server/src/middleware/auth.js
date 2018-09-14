const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const decodedToken = jwt.verify(token, "The_Secret_String");
    const userId= decodedToken.userId;
    req.userInfo = {email: decodedToken.email, userId: decodedToken.userId}
    next();
  } catch (error) {
    res.status(401).json({
      message: "Authentication Failed!, No Token "
    });
  }

};
