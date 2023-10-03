const router = require('express').Router();
const { Spot, SpotImage, Review, User, ReviewImage } = require('../../db/models');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation')
const sequelize = require('sequelize');

const validateSpot = [
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
];

router.get('/', async (req, res, next) => {
    const spots = await Spot.findAll({
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

router.get('/current', requireAuth, async (req, res, next) => {
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

router.get('/:spotId/reviews', async (req, res, next) => {
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

        const reviewImages = await ReviewImage.findByPk(review.id, {
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

router.get('/:spotId', async (req, res, next) => {
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


router.post('/', requireAuth, validateSpot, async (req, res, next) => {
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

router.post('/:spotId/images', requireAuth, async (req, res, next) => {
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

router.put('/:spotId', requireAuth, validateSpot, async (req, res, next) => {
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

router.delete('/:spotId', requireAuth, async (req, res, next) => {
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
