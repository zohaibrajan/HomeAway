const { validationResult } = require('express-validator');
const { Booking, Spot } = require('../db/models');
const { Op } = require('sequelize')
const moment = require('moment')

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

const dateValidationMiddleware = (req, _res, next) => {
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

const bookingValidationMiddleware = async (req, res, next) => {
  const spot = await Spot.findByPk(req.params.spotId);
  const { user } = req

  if (!spot) {
        res.status(404);
        return res.json({
            message: "Spot couldn't be found"
        })
    }

  if (spot.ownerId === user.id) {
        res.status(403);
        return res.json({
            message: 'Forbidden'
        })
    }

  const newStartDate = new Date(req.body.startDate);
  const newEndDate = new Date(req.body.endDate);

  const err = {
    errors: {}
  }

  err.status = 400;
  err.message = "Sorry, this spot is already booked for the specified dates"


  const bookings = await Booking.findAll({
    where: {
      spotId: spot.id
    }
  });


  for (let i = 0; i < bookings.length; i++) {
    const booking = bookings[i]
    const startDate = new Date(booking.startDate);
    const endDate = new Date(booking.endDate);

    if (moment(newStartDate).isSame(startDate)) {
      err.errors.startDate = "Start date conflicts with an existing booking"
    }
    if (moment(newStartDate).isSame(endDate)) {
      err.errors.startDate = "Start date conflicts with an existing booking"
    }
    if (moment(newEndDate).isSame(endDate)){
      err.errors.endDate = "End date conflicts with an existing booking"
    }
    if (moment(newEndDate).isSame(startDate)){
      err.errors.endDate = "End date conflicts with an existing booking"
    }
    if (moment(newStartDate).isBetween(startDate, endDate)) {
      err.errors.startDate = "Start date conflicts with an existing booking"
    }
    if (moment(newEndDate).isBetween(startDate, endDate)) {
      err.errors.endDate = "End date conflicts with an existing booking"
    }

    if (moment(newStartDate).isBefore(startDate) && moment(newEndDate).isAfter(endDate)) {
      err.errors.startDate = "Start date conflicts with an existing booking";
      err.errors.endDate = "End date conflicts with an existing booking"
    }

  }

  if (Object.keys(err.errors).length) next(err);

  next()
}

const editBookingValidation = async (req, res, next) => {
  const { user } = req
  const booking = await Booking.findByPk(req.params.bookingId)
  const currentDate = new Date();

  if (!booking) {
      res.status(404);
      return res.json({
          message: "Booking couldn't be found"
      })
  }

  if (booking.userId !== user.id) {
      res.status(403);
      return res.json({
          message: 'Forbidden'
      })
  }

  if (moment(booking.endDate).isBefore(currentDate)) {
      res.status(403);
      return res.json({
          message: "Past bookings can't be modified"
      })
  }

  const { startDate, endDate } = req.body;
  const newStartDate = startDate;
  const newEndDate = endDate;

  const err = {
      errors: {}
  }

  err.status = 400;
  err.message = "Sorry, this spot is already booked for the specified dates"

  const spot = await Spot.findByPk(booking.spotId)
  const spotBookings = await spot.getBookings({
    where: {
      id: {
        [Op.not]: booking.id
      }
    }
  });

  for (let i = 0; i < spotBookings.length; i++) {
      const booking = spotBookings[i]
      const startDate = new Date(booking.startDate);
      const endDate = new Date(booking.endDate);


      if (moment(newStartDate).isSame(startDate)) {
      err.errors.startDate = "Start date conflicts with an existing booking"
      }
      if (moment(newStartDate).isSame(endDate)) {
      err.errors.startDate = "Start date conflicts with an existing booking"
      }
      if (moment(newEndDate).isSame(endDate)){
      err.errors.endDate = "End date conflicts with an existing booking"
      }
      if (moment(newEndDate).isSame(startDate)){
      err.errors.endDate = "End date conflicts with an existing booking"
      }
      if (moment(newStartDate).isBetween(startDate, endDate)) {
      err.errors.startDate = "Start date conflicts with an existing booking"
      }
      if (moment(newEndDate).isBetween(startDate, endDate)) {
      err.errors.endDate = "End date conflicts with an existing booking"
      }

  }

  if (Object.keys(err.errors).length) next(err)

  next()
}

module.exports = {
  handleValidationErrors,
  dateValidationMiddleware,
  bookingValidationMiddleware,
  editBookingValidation
}
