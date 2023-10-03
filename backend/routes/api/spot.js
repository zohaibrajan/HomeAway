const router = require('express').Router();
const { Spot, SpotImage, Review, User } = require('../../db/models');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const sequelize = require('sequelize')

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

router.post('/', requireAuth, async (req, res, next) => {
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

    res.json(newSpot);
})

router.post('/:spotId/images', requireAuth, async (req, res, next) => {
  const spot = await Spot.findByPk(req.params.spotId)

  if (!(spot instanceof Spot)) {
    res.status(404);
    return res.json({
        message: "Spot couldn't be found"
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

module.exports = router
