const router = require('express').Router();
const { Spot, SpotImage, Review, User, ReviewImage } = require('../../db/models');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation')
const sequelize = require('sequelize');

router.get('/current', requireAuth, async (req, res, next) => {
    const { user } = req;

    const reviews = await Review.unscoped().findAll({
        where: {
            userId: user.id
        }
    });

    const reviewsJSON = reviews.map(review => review.toJSON());

    for (let i = 0; i < reviewsJSON.length; i++) {
        const review = reviewsJSON[i];

        const currUser = await User.findByPk(review.userId, {
            attributes: {
                exclude: ['username']
            }
        });

        review.User = currUser;

        const currSpot = await Spot.findByPk(review.spotId, {
            include: [
                {
                    model: SpotImage,
                    attributes: ['url', 'preview']
                },
            ],
            attributes: {
                exclude: ['description']
            }
        })

        const currSpotJSON = currSpot.toJSON()


        const imageArr = currSpotJSON.SpotImages;
        if (imageArr.length) {

            for (let i = 0; i < imageArr.length; i++) {
                const image = imageArr[i];

                if (image.preview === true) {
                    currSpotJSON.previewImage = image.url;
                    break
                } else {
                    currSpotJSON.previewImage = null
                }
            }
        } else {
            currSpotJSON.previewImage = null
        }

        delete currSpotJSON.SpotImages

        review.Spot = currSpotJSON


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


module.exports = router
