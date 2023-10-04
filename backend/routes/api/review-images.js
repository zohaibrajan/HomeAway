const router = require('express').Router();
const { Review, ReviewImage } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');



router.delete('/:imageId', requireAuth, async (req, res, next) => {
    const image = await ReviewImage.unscoped().findByPk(req.params.imageId);
    const { user } = req;

    if (!image) {
        res.status(404)
        return res.json({
            message: "Review Image couldn't be found"
        })
    }

    const review = await Review.findByPk(image.reviewId)

    if (review.userId !== user.id) {
        res.status(403);
        return res.json({
            message: 'Forbidden'
        })
    }

    await image.destroy();

    res.json({
        message: "Successfully deleted"
    })
})



module.exports = router
