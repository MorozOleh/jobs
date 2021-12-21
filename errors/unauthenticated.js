const CustomAPIError = require("./custom-error");

class UnUnauthenticatedError extends CustomAPIError {
  constructor(message) {
    super(message);
    this.statusCode = 401;
  }
}

module.exports = UnUnauthenticatedError;
