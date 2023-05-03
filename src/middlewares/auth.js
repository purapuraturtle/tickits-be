const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../config/environment");
const client = require("../config/redis");

const checkToken = async (req, res, next) => {
  const bearerToken = req.header("Authorization");
  if (!bearerToken)
    return res.status(403).json({
      msg: "Please login",
    });

  const token = bearerToken.split(" ")[1];
  const blacklist = await client.get("blacklist");
  if (blacklist === token) {
    return res.status(403).json({ msg: "Token is expired" });
  }
  jwt.verify(token, jwtSecret, async (err, payload) => {
    if (err && err.name)
      return res.status(403).json({
        msg: err.message,
      });
    if (err)
      return res.status(500).json({
        msg: "Internal Server Error",
      });
    req.authInfo = payload;
    next();
  });
};

module.exports = {
  checkToken,
};
