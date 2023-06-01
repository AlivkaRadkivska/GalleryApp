const express = require('express');
const router = express.Router();
const pictureController = require('./../controllers/pictureController');
const authController = require('./../controllers/authController');

router.route('/statistic')
    .get(pictureController.getPicturesStats)

router.route('/')
    .post(authController.protect, authController.restrictTo('artist'), pictureController.addPicture)
    .get(pictureController.getAllPictures)
    .delete(pictureController.deleteAllPictures)

router.route('/:id')
    .get(pictureController.getPicture)
    .patch(authController.protect, authController.restrictTo('artist'), pictureController.editPicture)
    .delete(authController.protect, authController.restrictTo('admin', 'artist'), pictureController.deletePicture)


module.exports = router