const router = require('express').Router();
const { Spot, SpotImage, Review, User, ReviewImage, Booking } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');
const { dateValidationMiddleware, editBookingValidation } = require('../../utils/validation');
const { validateReview, validateSpot } = require('../../utils/instanceValidators')
const sequelize = require('sequelize');
const review = require('../../db/models/review');
const moment = require('moment')



router.get('/current', requireAuth, async(req, res, _next) => {
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

router.put('/:bookingId', requireAuth, dateValidationMiddleware, editBookingValidation,
async (req, res, _next) => {
    const booking = await Booking.findByPk(req.params.bookingId)
    const spot = await Spot.findByPk(booking.spotId)

    const { startDate, endDate } = req.body;

    booking.startDate = startDate;
    booking.endDate = endDate;

    await booking.save();

    res.json(booking)

});

router.delete('/:bookingId', requireAuth, async (req, res, _next) => {
    const { user } = req;
    const booking = await Booking.findByPk(req.params.bookingId);
    const currentDate = new Date();

    if (!booking) {
        res.status(404);
        return res.json({
            message: "Booking couldn't be found"
        })
    }
    
    const spot = await Spot.findByPk(booking.spotId)

    const owner = await User.findByPk(spot.ownerId);


    if (booking.userId !== user.id && owner.id !== user.id) {
        res.status(403);
        return res.json({
            message: 'Forbidden'
        })
    }

    if (moment(currentDate).isAfter(booking.endDate)){
        res.status(403);
        return res.json({
            message: "Booking already complete"
        })
    }

    if (moment(currentDate).isBetween(booking.startDate, booking.endDate)) {
        res.status(403);
        return res.json({
            message: "Bookings that have been started can't be deleted"
        })
    }

    if (moment(currentDate).isSame(booking.startDate) || moment(currentDate).isSame(booking.endDate)) {
        res.status(403);
        return res.json({
            message: "Bookings that have been started can't be deleted"
        })
    }

    await booking.destroy();

    res.json({
        message: "Successfully deleted"
    })


})



module.exports = router
