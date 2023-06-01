const express = require('express');
const router = express.Router();
const likedController = require('../controllers/likedController');
const authController = require('./../controllers/authController');


router.route('/')
    .post(authController.protect, likedController.addLiked)
    .get(likedController.getAllLiked)
    .delete(likedController.deleteAllLiked)

router.route('/:id')
    .get(likedController.getLiked)
    .delete(likedController.deleteLiked)

module.exports = router