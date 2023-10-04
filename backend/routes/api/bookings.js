const router = require('express').Router();
const { Spot, SpotImage, Review, User, ReviewImage, Booking } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');
const { dateValidationMiddleware, bookingValidationMiddleware } = require('../../utils/validation');
const { validateReview, validateSpot } = require('../../utils/instanceValidators')
const sequelize = require('sequelize');
const review = require('../../db/models/review');



router.get('/current', requireAuth, async(req, res, next) => {
    const { user } = req;

    const bookings = await Booking.unscoped().findAll({
        where: {
            userId: user.id
        }
    });

    const bookingsJSON = bookings.map(booking => booking.toJSON())

    for (let i = 0; i < bookingsJSON.length; i++) {
        const booking = bookingsJSON[i]

        const spot = await Spot.findByPk(booking.spotId, {
            include: [
                {
                    model: SpotImage,
                    attributes: ['url', 'preview']
                }
            ],
            attributes: {
                exclude: ['description']
            }
        })

        const spotJSON = spot.toJSON();

        if (spotJSON.SpotImages.length > 0) {
            for (let i = 0; i < spotJSON.SpotImages.length; i++) {
                const image = spotJSON.SpotImages[i];

                if (image.preview) {
                    spotJSON.previewImage = image.url
                    break
                } else if (image.preview === false) {
                    spotJSON.previewImage = null
                }
            }
        } else {
            spotJSON.previewImage = null
        }

        delete spotJSON.SpotImages

        booking.Spot = spotJSON;

    }

    res.json({
        Bookings: bookingsJSON
    })
})

router.put('/:bookindId', requireAuth, dateValidationMiddleware,
bookingValidationMiddleware, async (req, res, next) => {

})



module.exports = router
