const { validationResult } = require('express-validator');


const handleValidationErrors = (req, _res, next) => { // formats the error message
  const validationErrors = validationResult(req);

  if (!validationErrors.isEmpty()) {
    const errors = {};
    validationErrors
      .array()
      .forEach(error => errors[error.path] = error.msg);

    const err = Error("Bad request.");
    err.errors = errors;
    err.status = 400;
    err.title = "Bad request.";
    next(err);
  }
  next();
}

const dateValidationMiddleware = (req, res, next) => {
  const startDate = new Date(req.body.startDate);
  const endDate = new Date(req.body.endDate);
  const currentDate = new Date();

  const err = {
    errors: {}
  };

  err.message = 'Bad Request'
  err.status = 400

  if (startDate <= currentDate) {
    err.errors.startDate = 'Start date must be in the future'
  }

  if (endDate <= startDate) {
    err.errors.endDate = "endDate cannot be on or before startDate"
  }

  if (Object.keys(err.errors).length) next(err);

  next()
};

module.exports = {
  handleValidationErrors,
  dateValidationMiddleware
};
