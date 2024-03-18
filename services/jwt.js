const jwt = require("jsonwebtoken");

exports.generateToken = (payload) => {
  const token = jwt.sign({ payload }, process.env.JWT_SECRET, {
    expiresIn: "2d",
  });
  return token;
};

exports.verifyToken = (token) => {
  const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
  return decodedToken;
};
