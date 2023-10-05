const router = require('express').Router();
const { Spot, SpotImage, Review, User, ReviewImage, Booking } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');
const { validateReview, validateSpot, validateQuery } = require('../../utils/instanceValidators')
const sequelize = require('sequelize');
const review = require('../../db/models/review');
const { dateValidationMiddleware, bookingValidationMiddleware } = require('../../utils/validation');
const { updateLocale } = require('moment');
const { Op } = require("sequelize")


router.get('/', validateQuery, async (req, res, _next) => {
    let { page, size, minLat, maxLat, minLng, maxLng, minPrice, maxPrice} = req.query
    const whereObj = {}
    const pagination = {};

    if (minLat) whereObj.lat = {[Op.gte]: minLat};
    if (maxLat) whereObj.lat = {[Op.lte]: maxLat};
    if (minLng) whereObj.lng = {[Op.gte]: minLng};
    if (maxLng) whereObj.lng = {[Op.lte]: maxLng};
    if (minPrice) whereObj.price = {[Op.gte]: minPrice};
    if (maxPrice) whereObj.price = {[Op.lte]: maxPrice};

    if (!page) page = 1;
    if (!size) size = 20;

    pagination.limit = size;
    pagination.offset = size * (page - 1);

    const spots = await Spot.findAll({
        include: [
            {
                model: SpotImage,
                attributes: ['url', 'preview']
            }
        ],
        where: {
            ...whereObj
        },
        ...pagination
    });

    const spotsJSON = spots.map(spot => spot.toJSON());

    for (let i = 0; i < spotsJSON.length; i++) {
        const spot = spotsJSON[i];

        const reviews = await Review.findAll({
            where: {
                spotId: spot.id
            }
        })

        const avg = await Review.sum('stars', {
            where: {
                spotId: spot.id
            }
        })


        if (spot.SpotImages.length > 0) {
            spot.avgRating = avg / reviews.length;

            for (let i = 0; i < spot.SpotImages.length; i++) {
                const image = spot.SpotImages[i];

                if (image.preview) {
                    spot.previewImage = image.url
                    break
                } else if (image.preview === false) {
                    spot.previewImage = null
                }

            }
        } else {
            spot.previewImage = null
            spot.avgRating = 0;
        }
        delete spot.SpotImages
    }


    res.json({
        Spots: spotsJSON,
        page: Number(page),
        size: Number(size)
    });
})

router.get('/current', requireAuth, async (req, res, _next) => {
  const { user } = req;
  const spots = await Spot.findAll({
        where: {
          ownerId: user.id
        },
        include: [
            {
                model: SpotImage,
                attributes: ['url', 'preview']
            }
        ]
    });


    const spotsJSON = spots.map(spot => spot.toJSON());

    for (let i = 0; i < spotsJSON.length; i++) {
        const spot = spotsJSON[i];

        const reviews = await Review.findAll({
            where: {
                spotId: spot.id
            }
        })

        const avg = await Review.sum('stars', {
            where: {
                spotId: spot.id
            }
        })

        if (spot.SpotImages.length > 0) {
            spot.avgRating = avg / reviews.length;

            for (let i = 0; i < spot.SpotImages.length; i++) {
                const image = spot.SpotImages[i];

                if (image.preview) {
                    spot.previewImage = image.url
                    break
                } else if (image.preview === false) {
                    spot.previewImage = null
                }
            }
        } else {
            spot.previewImage = null
            spot.avgRating = 0;
        }
        delete spot.SpotImages
    }

    res.json({
        Spots: spotsJSON
    });
})

router.get('/:spotId/bookings', requireAuth, async (req, res, _next) => {
    const { user } = req;
    const spot = await Spot.findByPk(req.params.spotId);

    if (!spot) {
        res.status(404);
        return res.json({
            message: "Spot couldn't be found"
        })
    }

    if (spot.ownerId === user.id) {
        const bookings = await spot.getBookings({
            attributes: {
                include: ['createdAt', 'updatedAt']
            }
        });

        const bookingsJSON = bookings.map(booking => booking.toJSON());

        for (let i = 0; i < bookingsJSON.length; i++) {
            const booking = bookingsJSON[i];

            const user = await User.findByPk(booking.userId, {
                attributes: {
                    exclude: ['username']
                }
            });

            booking.User = user
        }

        return res.json({
            Bookings: bookingsJSON
        });
    }

    const bookings = await spot.getBookings({
        attributes: {
            exclude: ['id', 'userId']
        }
    });

    res.json({
        Bookings: bookings
    });
});

router.post('/:spotId/bookings', requireAuth, dateValidationMiddleware,
bookingValidationMiddleware, async (req, res, _next) => {
    const spot = await Spot.findByPk(req.params.spotId);
    const { user } = req

    const { startDate, endDate } = req.body

    const newBooking = await Booking.create({
        spotId: spot.id,
        userId: user.id,
        startDate,
        endDate
    });

    res.json({
        id: newBooking.id,
        spotId: newBooking.spotId,
        startDate: newBooking.startDate.toLocaleDateString(),
        endDate: newBooking.endDate.toLocaleDateString(),
        createdAt: newBooking.createdAt,
        updatedAt: newBooking.updatedAt
    });
})

router.get('/:spotId/reviews', async (req, res, _next) => {
    const spot = await Spot.findByPk(req.params.spotId);

    if (!spot) {
        res.status(404);
        return res.json({
        message: "Spot couldn't be found"
        })
    }

    const reviews = await spot.getReviews({
        attributes: {
            include: ['createdAt', 'updatedAt']
        }
    });

    const reviewsJSON = reviews.map(review => review.toJSON());

    for (let i = 0; i < reviewsJSON.length; i++) {
        const review = reviewsJSON[i];

        const user = await User.findByPk(review.userId, {
            attributes: {
                exclude: ['username']
            }
        })

        review.User = user;

        const reviewImages = await ReviewImage.findAll({
            where: {
                reviewId: review.id
            },
            attributes: {
                exclude: ['reviewId']
            }
        });

        review.ReviewImages = reviewImages
    }

    res.json({
        Reviews: reviewsJSON
    })
})

router.post('/:spotId/reviews', requireAuth, validateReview, async(req, res, _next) => {
    const { user } = req;
    const { review, stars } = req.body

    const spot = await Spot.findByPk(req.params.spotId);

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

    const reviews = await spot.getReviews()

    const userReview = await Review.findOne({
        where: {
            userId: user.id,
            spotId: spot.id
        }
    })

    if (userReview) {
        res.status(500);
        return res.json({
            message: "User already has a review for this spot"
        })
    }

    const newReview = await Review.create({
        userId: user.id,
        spotId: spot.id,
        review,
        stars
    })

    reviews.push(newReview)

    res.status(201)
    res.json(newReview)
})

router.get('/:spotId', async (req, res, _next) => {
  const { spotId } = req.params;

  const spot = await Spot.unscoped().findByPk(spotId)

  if (!(spot instanceof Spot)) {
    res.status(404);
    return res.json({
        message: "Spot couldn't be found"
    })
  }

  const spotJSON = spot.toJSON()

  const reviews = await spot.getReviews()
  spotJSON.numReviews = reviews.length;


  const avg = await Review.sum('stars', {
    where: {
        spotId: spot.id
    }
  })

  spotJSON.avgRating = avg / reviews.length

  const image = await SpotImage.findAll({
    where: {
        spotId: spot.id
    },
    attributes: {
        exclude: ['spotId', 'createdAt', 'updatedAt']
    }
  })


  spotJSON.SpotImages = image

  const owner = await User.findByPk(spot.ownerId, {
    attributes: {
        exclude: ['username']
    }
  })
  spotJSON.Owner = owner

  res.json(spotJSON)

})


router.post('/', requireAuth, validateSpot, async (req, res, _next) => {
    const { address, city, state, country, lat, lng, name,
    description, price } = req.body

    const { user } = req

    const newSpot = await Spot.create({
        ownerId: user.id,
        address,
        city,
        state,
        country,
        lat,
        lng,
        name,
        description,
        price
    })

    res.status(201)
    res.json(newSpot);
})

router.post('/:spotId/images', requireAuth, async (req, res, _next) => {
    const { user } = req;

    const spot = await Spot.findByPk(req.params.spotId)

    if (!(spot instanceof Spot)) {
        res.status(404);
        return res.json({
            message: "Spot couldn't be found"
        })
    }

    if (spot.ownerId !== user.id) {
        res.status(403);
        return res.json({
            message: "Forbidden"
        })
    }

    const images = await spot.getSpotImages();

    const { url, preview } = req.body

    const newImage = await SpotImage.create({
        spotId: spot.id,
        url,
        preview
    })

    images.push(newImage)

    res.json({
        id: newImage.id,
        url: newImage.url,
        preview: newImage.preview
    })

})

router.put('/:spotId', requireAuth, validateSpot, async (req, res, _next) => {
    const { user } = req;
    const spot = await Spot.unscoped().findByPk(req.params.spotId)

    if (!(spot instanceof Spot)) {
        res.status(404);
        return res.json({
            message: "Spot couldn't be found"
        })
    }

   if (spot.ownerId !== user.id) {
        res.status(403);
        return res.json({
            message: "Forbidden"
        })
    }


    const { address, city, state, country, lat, lng, name,
    description, price } = req.body;

    spot.address = address;
    spot.city = city;
    spot.state = state;
    spot.country = country;
    spot.lat = lat;
    spot.lng = lng;
    spot.name = name;
    spot.description = description;
    spot.price = price;

    await spot.save();

    res.json(spot)

});

router.delete('/:spotId', requireAuth, async (req, res, _next) => {
    const { user } = req;

    const spot = await Spot.findByPk(req.params.spotId)

    if (!(spot instanceof Spot)) {
        res.status(404);
        return res.json({
            message: "Spot couldn't be found"
        })
    }

   if (spot.ownerId !== user.id) {
        res.status(403);
        return res.json({
            message: "Forbidden"
        })
    }

    await spot.destroy();

    res.json({
        message: "Successfully deleted"
    })
})

module.exports = router
