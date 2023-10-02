const router = require('express').Router();
const { Spot, SpotImage, Review } = require('../../db/models');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const sequelize = require('sequelize')

router.get('/', async (req, res, next) => {
    const spots = await Spot.findAll({
        include: [
            {
                model: SpotImage,
                attributes: ['url']
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
        }) / reviews.length;

        spot.avgRating = avg
        spot.previewImage = spot.SpotImages[0].url
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
                attributes: ['url']
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
        }) / reviews.length;

        spot.avgRating = avg
        spot.previewImage = spot.SpotImages[0].url
        delete spot.SpotImages
    }

    res.json({
        Spots: spotsJSON
    });
})

module.exports = router
