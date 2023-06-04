const express = require('express');
const router = express.Router({ mergeParams: true });
const pictureController = require('./../controllers/pictureController');
const authController = require('./../controllers/authController');

router.route('/statistic')
    .get(pictureController.getPicturesStats)

router.route('/')
    .post(authController.protect,
        authController.restrictTo('artist'),
        pictureController.addArtist,
        pictureController.addPicture)
    .get(pictureController.getAllPictures)
    .delete(pictureController.deleteAllPictures) //!ONLY FOR TEST

router.route('/:id')
    .get(pictureController.getPicture)
    .patch(authController.protect,
        authController.restrictTo('artist'),
        pictureController.checkArtist,
        pictureController.updatePicture)
    .delete(authController.protect,
        authController.restrictTo('artist'),
        pictureController.checkArtist,
        pictureController.deletePictureConnects,
        pictureController.deletePicture)

module.exports = router;