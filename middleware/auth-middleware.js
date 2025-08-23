const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token =
     (authHeader && authHeader.split(" ")[1]);

  if (!token) {
    return res.status(401).json({
      success: false,
      message:
        "Access denied. No token provided. Please login to continue",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.userInfo = decoded;
    next();
  } catch (err) {
    console.error("JWT verification failed:", err.message);
    return res.status(401).json({
      success: false,
      message: "Access denied. Invalid or expired token.",
    });
  }
};

module.exports = authMiddleware;
