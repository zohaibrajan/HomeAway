const { handleValidationErrors } = require('./validation');
const { check } = require('express-validator');

const dateValidationMiddleware = (req, res, next) => {
  const startDate = new Date(req.body.startDate);
  const endDate = new Date(req.body.endDate);
  const currentDate = new Date();

  const errors = {};

  if (startDate <= currentDate) {
    res.status(400).json(
        { error: 'Start date must be in the future' }
    );
  }

  if (endDate <= startDate) {
    res.status(400).json(
        { error: 'End date must be after start date' }
    );
  }

  next();
};

const validators = {
    validateSpot: [
        check('address')
            .exists({ checkFalsy: true })
            .withMessage("Street address is required"),
        check('city')
            .exists({ checkFalsy: true })
            .withMessage("City is required"),
        check('state')
            .exists({ checkFalsy: true })
            .withMessage("State is required"),
        check("country")
            .exists({ checkFalsy: true })
            .withMessage("Country is required"),
        check("lat")
            .exists({ checkFalsy: true })
            .withMessage("Latitude is not valid"),
        check("lng")
            .exists({ checkFalsy: true })
            .withMessage("Longitude is not valid"),
        check("name")
            .exists({ checkFalsy: true })
            .withMessage("Name must be less than 50 characters"),
        check("description")
            .exists({ checkFalsy: true })
            .withMessage("Description is required"),
        check("price")
            .exists({ checkFalsy: true })
            .withMessage("Price per day is required"),
        handleValidationErrors
    ],

    validateReview: [
        check("review")
            .exists({checkFalsy: true})
            .isString()
            .withMessage("Review text is required"),
        check("stars")
            .exists({checkFalsy: true})
            .withMessage("Stars must be an integer from 1 to 5"),
        handleValidationErrors
    ],

    validateEndDate: [
        check("startDate")
            .exists({checkFalsy: true}),
        check("endDate")
            .exists({checkFalsy: true}),
        dateValidationMiddleware,
        handleValidationErrors
    ]
}


module.exports = validators
