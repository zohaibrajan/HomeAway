const { handleValidationErrors } = require('./validation');
const { check } = require('express-validator');

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

    validateQuery: [
        check("page")
            .optional()
            .isInt({ min: 1, max: 10 })
            .withMessage("Page must be an integer between 1 and 10"),
        check("size")
            .optional()
            .isInt({ min: 1, max: 20 })
            .withMessage("Size must be an integer between 1 and 20"),
        check("minLat")
            .optional()
            .isDecimal()
            .withMessage("Minimum latitude must be a decimal"),
        check("maxLat")
            .optional()
            .isDecimal()
            .withMessage("Maximum latitude must be a decimal"),
        check("minLng")
            .optional()
            .isDecimal()
            .withMessage("Minimum longitude must be a decimal"),
        check("maxLng")
            .optional()
            .isDecimal()
            .withMessage("Maximum longitude must be a decimal"),
        check("minPrice")
            .optional()
            .isDecimal({ min: 0 })
            .withMessage("Minimum price must be a decimal greater than or equal to 0"),
        check("maxPrice")
            .optional()
            .isDecimal({ min: 0 })
            .withMessage("Maximum price must be a decimal greater than or equal to 0")
    ]
}


module.exports = validators
