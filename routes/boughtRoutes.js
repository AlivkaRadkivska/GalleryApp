const express = require('express');
const router = express.Router();
const boughtController = require('../controllers/boughtController');
// const auth = require('.././middleware/auth');
// router.use(auth)


router.route('/')
    .post(boughtController.addBought)
    .get(boughtController.getAllBought)
    .delete(boughtController.deleteAllBought)

router.route('/:id')
    .get(boughtController.getBought)
    .delete(boughtController.deleteBought)

module.exports = router