const express = require('express');
const router = express.Router();
const boughtController = require('./../controllers/boughtController');
const authController = require('./../controllers/authController');

router.use(authController.protect, authController.restrictTo('user', 'artist'));

router.get(
  '/checkout-session/:id',
  boughtController.checkAddingByOwner,
  boughtController.getCheckoutSession
);

module.exports = router;
