const express = require('express');
const router = express.Router();
const boughtController = require('../controllers/boughtController');
const authController = require('./../controllers/authController');


router.route('/')
    .post(authController.protect, boughtController.addBought)
    .get(boughtController.getAllBought)
    .delete(boughtController.deleteAllBought)

router.route('/:id')
    .get(boughtController.getBought)
    .delete(boughtController.deleteBought)

module.exports = router