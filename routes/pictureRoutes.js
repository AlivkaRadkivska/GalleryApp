const express = require('express');
const router = express.Router({ mergeParams: true });
const pictureController = require('./../controllers/pictureController');
const authController = require('./../controllers/authController');

router.route('/statistic').get(pictureController.getPicturesStats);
router.get('/', pictureController.getAllPictures);
router.get('/:id', pictureController.getPicture);

router.use(authController.protect);
router.post(
  '/',
  authController.restrictTo('artist'),
  pictureController.upload,
  pictureController.addImage,
  pictureController.addArtist,
  pictureController.addPicture
);

router
  .route('/:id')
  .patch(
    authController.restrictTo('artist'),
    pictureController.checkArtist,
    pictureController.updatePicture
  )
  .delete(
    authController.restrictTo('artist'),
    pictureController.checkArtist,
    pictureController.deletePictureConnects,
    pictureController.deleteImage,
    pictureController.deletePicture
  );

router.patch(
  '/:id/status',
  authController.restrictTo('admin'),
  pictureController.updatePictureStatus
);

module.exports = router;
