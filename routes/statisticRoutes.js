const express = require('express');
const router = express.Router();
const statisticController = require('../controllers/statisticController');


router.route('/most-liked-pictures')
  .get(statisticController.getMostLikedPictures)

router.route('/most-bought-pictures')
  .get(statisticController.getMostBoughtPictures);

router.route('/most-liked-artists')
  .get(statisticController.getMostLikedArtists);

module.exports = router