const express = require('express');
const router = express.Router();
const viewsController = require('../controllers/viewsController');
const authController = require('./../controllers/authController');

router.use(authController.checkLoggedUser);

router.get('/', viewsController.regexSearch, viewsController.getMainPage);
router.get(
  '/login',
  authController.restrictToLogged,
  viewsController.getLoginPage
);
router.get(
  '/signup',
  authController.restrictToLogged,
  viewsController.getSignupPage
);
router.get(
  '/update-info',
  authController.protect,
  viewsController.getUpdateInfoPage
);
router.get(
  '/update-password',
  authController.protect,
  viewsController.getUpdatePassPage
);

module.exports = router;
