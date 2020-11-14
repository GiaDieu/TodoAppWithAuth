const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  try {
    const token = req.header("x-auth-token");
    if (!token)
      return res
        .status(401)
        .json({ message: "No Authentication Token, Authorization denied" });

    const verifiedToken = jwt.verify(token, process.env.JWT_TOKEN);
    if (!verifiedToken)
      return res
        .status(401)
        .json({ message: "Token verification failed, authorization denied." });

    req.user = verifiedToken.id;
    next();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = auth;
