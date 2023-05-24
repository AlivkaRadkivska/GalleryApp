const express = require('express');
const router = express.Router();
const likedController = require('../controllers/likedController');
// const auth = require('.././middleware/auth');
// router.use(auth)


router.route('/')
    .post(likedController.addLiked)
    .get(likedController.getAllLiked)
    .delete(likedController.deleteAllLiked)

router.route('/:id')
    .get(likedController.getLiked)
    .patch(likedController.editLiked)
    .delete(likedController.deleteLiked)

router.route('user/:id')
    .delete(likedController.deleteAllLikedByUser)

router.route('picture/:id')
    .delete(likedController.deleteAllLikedByPicture)


module.exports = router