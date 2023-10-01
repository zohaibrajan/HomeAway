const express = require('express');
const { Spot } = require('../../db/models');
const { SpotImage } = require('../../db/models');
const { Review } = require('../../db/models');
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
    })
    res.json({
        Spots: spots
    });
})

module.exports = router
