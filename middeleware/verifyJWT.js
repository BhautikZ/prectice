const jwt = require("jsonwebtoken");
require("dotenv").config();

const verifyJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      if (err) {
        return res.status(403).json(err);
      }
      req.user = user;
      next();
    });
  } else {
    res.status(401).json("You are not authenticated!!");
  }
};
module.exports = verifyJWT;
