const BadRequestError = require('./bad-request-error');
const UnauthenticatedError = require('./unauthenticated-error');
const CustomAPIError = require('./custom-error');
const NotFoundError = require('./not-found-error');

module.exports = {
  BadRequestError,
  UnauthenticatedError,
  CustomAPIError,
  NotFoundError,
};
