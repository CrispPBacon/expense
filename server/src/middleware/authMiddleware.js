const jwt = require("jsonwebtoken");
require("dotenv").config();

function verifyAuth(req, res, next) {
  const token = req.headers["authorization"]?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ msg: "No token provided!" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (error, decodedToken) => {
    if (error) return res.status(403).json({ msg: "Invalid or expired token" });
    req.user = decodedToken;
    console.log("Someone has accessed the auth route");
    next();
  });
}

module.exports = { verifyAuth };
