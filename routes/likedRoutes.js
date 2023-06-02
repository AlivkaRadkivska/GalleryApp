const express = require('express');
const router = express.Router();
const likedController = require('./../controllers/likedController');
const authController = require('./../controllers/authController');


router.route('/') //ONLY FOR TEST
    .get(likedController.getAllLiked)
    .delete(likedController.deleteAllLiked)

router.use(authController.protect, authController.restrictTo('user', 'artist'));

router.route('/')
    .post(likedController.checkAddingByOwner, likedController.addUser, likedController.addLiked)

router.route('/:id')
    .get(likedController.denyAccess, likedController.getLiked)
    .delete(likedController.denyAccess, likedController.deleteLiked)

module.exports = router;