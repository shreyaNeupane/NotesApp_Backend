const jwt = require("jsonwebtoken");

const authMiddlware = async (req, res, next) => {
  try {
    //getting authorization form frontend
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json("please provide token");
    }
    // extrct token = spliting bearer & token
    const token = authHeader.split(" ")[1];
    //verfying token  using secert key
    const decoded = jwt.verify(token,process.env.JWT_SECRET);
    //attach decoded data to request
    req.user = decoded.id;
    console.log("authMiddleware user:", req.user);

//move to next middleware/controller
    next();
  } catch (error) {
    console.log(error);
    res.status(500).json("internal error");
  }
};
module.exports = authMiddlware;
