const router = require('express').Router();
const { Spot, SpotImage, Review, User, ReviewImage } = require('../../db/models');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
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

router.post('/:reviewId/images', requireAuth, async (req, res, next) => {
    const { user } = req
    const review = await Review.findByPk(req.params.reviewId);

    if (!review) {
        res.status(404);
        return res.json({
            message: "Review couldn't be found"
        })
    }
    if (review.userId !== user.id) {
        res.status(403);
        return res.json({
            message: "Forbidden"
        })
    }

    const images = await review.getReviewImages()

    if (images.length >= 10) {
        res.status(403);
        return res.json({
            message: "Maximum number of images for this resource was reached"
        })
    }

    const { url } = req.body

    const newReviewImage = await ReviewImage.create({
        reviewId: review.id,
        url
    })

    images.push(newReviewImage)

    res.json({
        id: newReviewImage.id,
        url: newReviewImage.url
    })

})

router.put('/:reviewId', requireAuth, async(req, res, next) => {
    const { user } = req
    const review = await Review.findByPk(req.params.reviewId);

    if (review.userId !== user.id) {
        res.status(403);
        return res.json({
            message: "Forbidden"
        })
    }
})


module.exports = router
