const { StatusCodes } = require('http-status-codes');
const { CustomAPIError } = require('../errors');

const errorHandler = (err, req, res, next) => {
  //! set custom error handler

  let customError = {
    //? set default;
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    message: err.message || 'something went wrong try again later',
  };

  // this if statement is unneeded anymore because of custom error obj;
  // which will catch all errors and send particular message and status code;
  // if (err instanceof CustomAPIError) {
  //   return res.status(err.statusCode).json({ message: err.message });
  // }

  if (err.name === 'ValidationError') {
    customError.message = Object.values(err.errors)
      .map((field) => field.message)
      .join(', ');
    customError.statusCode = 400;
  }

  if (err.name === 'CastError') {
    customError.message = `No item found with id: ${err.value}`;
    customError.statusCode = StatusCodes.NOT_FOUND;
  }

  if (err.code && err.code === 11000) {
    (customError.message = `Duplicate value entered for ${Object.keys(
      err.keyValue
    )} field, please choose another code`),
      (customError.statusCode = 400);
  }
  // return res.status(500).json({ err });
  return res
    .status(customError.statusCode)
    .json({ message: customError.message });
};

module.exports = errorHandler;
