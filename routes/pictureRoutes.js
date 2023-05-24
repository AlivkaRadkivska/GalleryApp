const express = require('express');
const router = express.Router();
const pictureController = require('./../controllers/pictureController');
// const auth = require('.././middleware/auth');
// router.use(auth)


router.route('/')
    .post(pictureController.addPicture)
    .get(pictureController.getAllPictures)
    .delete(pictureController.deleteAllPictures)

router.route('/:id')
    .get(pictureController.getPicture)
    .patch(pictureController.editPicture)
    .delete(pictureController.deletePicture)

router.route('/artist/:id')
    .get(pictureController.getPicturesByArtist)
    .delete(pictureController.deleteAllPicturesByArtist)

router.route('/category/:id')
    .get(pictureController.getPicturesByCategory)


module.exports = router