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

  const errors = {};

  if (startDate <= currentDate) {
    return res.status(400).json(
        { error: 'Start date must be in the future' }
    );
  }

  if (endDate <= startDate) {
    return res.status(400).json(
        { error: 'End date must be after start date' }
    );
  }

  next();
};

module.exports = {
  handleValidationErrors,
  dateValidationMiddleware
};
