const express = require('express');
const router = express.Router();
const viewsController = require('../controllers/viewsController');
const authController = require('./../controllers/authController');
const boughtController = require('./../controllers/boughtController');

router.use(authController.checkLoggedUser);

router.get('/', viewsController.regexSearch, viewsController.getMainPage);
router.get('/statistic', viewsController.getStatisticPage);

//USERS
router.get('/login', authController.restrictToLogged, viewsController.getLoginPage);
router.get('/signup', authController.restrictToLogged, viewsController.getSignupPage);
router.get('/update-info', authController.protect, viewsController.getUpdateInfoPage);
router.get('/update-password', authController.protect, viewsController.getUpdatePassPage);

router.get(
  '/bought',
  authController.protect,
  boughtController.addBought,
  viewsController.getBoughtPage
);

//ARTISTS
router.get(
  '/artist/pictures',
  authController.protect,
  authController.restrictTo('artist'),
  viewsController.getArtistPictures
);
router.get(
  '/artist/add-picture',
  authController.protect,
  authController.restrictTo('artist'),
  viewsController.getPicturePage
);
router.get(
  '/artist/update-picture/:id',
  authController.protect,
  authController.restrictTo('artist'),
  viewsController.getPicturePage
);

//ADMIN
router.get(
  '/admin/panel',
  authController.protect,
  authController.restrictTo('admin'),
  viewsController.getAdminTables
);

router.get(
  '/admin/db-backup',
  authController.protect,
  authController.restrictTo('admin'),
  viewsController.getBackup
);

module.exports = router;
