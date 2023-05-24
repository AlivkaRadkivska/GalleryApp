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
    .patch(boughtController.editBought)
    .delete(boughtController.deleteBought)

router.route('user/:id')
    .delete(boughtController.deleteAllBoughtByUser)

router.route('picture/:id')
    .delete(boughtController.deleteAllBoughtByPicture)


module.exports = router