require("dotenv").config();
const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, UnauthenticatedError } = require("../errors");
const bcrypt = require("bcryptjs");

const register = async (req, res) => {
  const { body } = req;
  const user = await User.create({ ...body });

  const token = user.getToken();

  res.status(StatusCodes.CREATED).json({ username: user.name, token });
};
const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequestError("Please provide email and password");
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw new UnauthenticatedError("Invalid Credentials");
  }

  const isPasswordCorrect = await user.comparePassword(password);

  if (!isPasswordCorrect) {
    throw new UnauthenticatedError("Invalid Credentials");
  }

  const token = user.getToken();

  res.status(StatusCodes.OK).json({
    user: {
      name: user.name,
    },
    token,
  });
};

module.exports = { register, login };
