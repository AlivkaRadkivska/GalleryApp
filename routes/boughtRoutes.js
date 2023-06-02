const express = require('express');
const router = express.Router();
const boughtController = require('./../controllers/boughtController');
const authController = require('./../controllers/authController');


router.route('/') //ONLY FOR TEST
    .get(boughtController.getAllBought)
    .delete(boughtController.deleteAllBought)

router.use(authController.protect, authController.restrictTo('user', 'artist'));

router.route('/')
    .post(boughtController.checkAddingByOwner, boughtController.addUser, boughtController.addBought)

router.route('/:id')
    .get(boughtController.denyAccess, boughtController.getBought)
    .delete(boughtController.denyAccess, boughtController.deleteBought)

module.exports = router;