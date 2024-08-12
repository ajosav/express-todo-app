const httpStatus = require("http-status");
const {errorResponse} = require('./utils/response');
const Logger = require("./logger");

module.exports = (err, req, res, next) => {
  if (err.name === "ValidationError") {
    const errorBody = err.details.map(error => {
      const errors = {}
      errors[error.context.key] = error.message.replace(/['"]/g, '')
      return errors;
    });
    return res.status(httpStatus.UNPROCESSABLE_ENTITY).json(errorResponse('One or more fields are invalid!', errorBody))
  }

  if (
    err.name === "UniqueConstraintError" ||
    err.name === "SequelizeUniqueConstraintError"
  ) {
    const errorBody = err.errors.map(error => {
      const errors = {}
      errors[error.path] = error.message
      return errors;
    })

    return res.status(httpStatus.CONFLICT).json(errorResponse('A duplicate resource already exists', errorBody))
  }
  if (err.statusCode) {
    return res.status(err.statusCode).json({
      status: false,
      message: err.message,
      error_code: err.code || undefined,
    });
  }

  Logger.error(err.message)
  return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
    status: false,
    message: 'Something went wrong',
    errors: {}
  });
};
