require("dotenv").config();

const User = require("../models/User");

const jwt = require("jsonwebtoken");
const { UnauthenticatedError } = require("../errors");

const auth = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  // * if  authHeader is null or starts no with Bearer throw error;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new UnauthenticatedError("Authentication invalid");
  }

  //* split string and take a token from that string;
  const token = authHeader.split(" ")[1];

  try {
    const payload = await jwt.verify(token, process.env.JWT_SECRET);
    // const user = await User.findById(payload.userId).select([
    //   '-__v',
    //   '-password',
    // ]);

    req.user = { name: payload.name, userId: payload.userId };
    next();
  } catch (error) {
    throw new UnauthenticatedError("Authentication invalid");
  }
};

module.exports = auth;
