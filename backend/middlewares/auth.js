const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

exports.isAuthenticate = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    // console.log(token);
    if (!token) {
      return res.status(401).json({
        message: "Please login to access this resources",
      });
    }

    const decodedData = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decodedData.id);

    next();
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
};

//CHECKING THE ROLE OF USER

exports.authorizeRoles = (...roles) => {
  try {
    return (req, res, next) => {
      if (!roles.includes(req.user.role)) {
        return res
          .status(400)
          .send(
            `Role: ${req.user.role} is not allowed to access this resource`
          );
      }
      next(); //mainting the flow
    };
  } catch (e) {
    return res.status(500).send(e);
  }
};
