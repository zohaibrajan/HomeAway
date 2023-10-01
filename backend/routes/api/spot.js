const express = require('express');
const { Spot, SpotImage, Review, sequelize } = require('../../db/models');
const { Model } = require('sequelize');
const router = express.Router();

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
        spot.previewImage = spot.SpotImages[0].url
        delete spot.SpotImages
    }

    res.json({
        Spots: spotsJSON
    });
})

module.exports = router
