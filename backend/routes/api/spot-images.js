const router = require('express').Router();
const { Spot, SpotImage } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');


router.delete('/:imageId', requireAuth, async (req, res, _next) => {
    const image = await SpotImage.unscoped().findByPk(req.params.imageId);
    const { user } = req;

    if (!image) {
        res.status(404)
        return res.json({
            message: "Spot Image couldn't be found"
        })
    }

    const spot = await Spot.findByPk(image.spotId)

    if (spot.ownerId !== user.id) {
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
