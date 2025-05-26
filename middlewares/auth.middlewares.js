import jwt from "jsonwebtoken";


const authenticationMiddleware = async (req, resp, next) => {
  try {
    const bearerHeader = req.cookies.token;

    if (!bearerHeader) {
      return resp.status(401).json({
        message: "Token required for authentication",
      });
    }

    const payload = jwt.verify(bearerHeader, process.env.JWT_TOKEN_SECRET);
    req.user = payload;
    next();


  } catch (error) {
    return resp.status(400).json({
      success: false,
      message: "Invalid Token",
    });
  }
};

export default authenticationMiddleware;
