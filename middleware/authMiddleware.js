const { findUserById } = require("../database/repository/authRepository");
const { verifyToken } = require("../services/jwt");

const authenticateJWT = async (req, res, next) => {
  let token = req.header("Authorization");
  if (token) {
    token = token.replace(/^Bearer\s+/i, "");
  } else {
    return res.status(401).json({ message: "Authentication required." });
  }

  const decodeToken = await verifyToken(token);
  console.log(decodeToken);

  let user = await findUserById(decodeToken);
  if (user) {
    console.log(user);
    req.user = user;
    next();
  } else {
    return res.status(401).json({ message: "Authentication required." });
  }
};

module.exports = authenticateJWT;
