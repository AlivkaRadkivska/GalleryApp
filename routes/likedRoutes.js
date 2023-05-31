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
    .delete(likedController.deleteLiked)

module.exports = router