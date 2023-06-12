const express = require('express');
const router = express.Router();
const userController = require('./../controllers/userController');
const authController = require('./../controllers/authController');

router.post(
  '/signup',
  userController.uploadAvatar,
  userController.addAvatar,
  authController.signup
);
router.post('/login', authController.login);
router.get('/logout', authController.protect, authController.logout);

router.use(authController.protect);

router.get('/me', userController.setCurrUser, userController.getCurrUser);
router.patch('/update-password', userController.setCurrUser, authController.updatePassword);
router.patch(
  '/update-info',
  userController.setCurrUser,
  userController.checkPasswordUpdating,
  userController.deleteAvatar,
  userController.uploadAvatar,
  userController.addAvatar,
  userController.updateCurrUser
);
router.delete(
  '/me',
  userController.setCurrUser,
  authController.restrictTo('user', 'artist'),
  userController.deleteUserConnects,
  userController.deleteAvatar,
  authController.deleteCurrUser,
  authController.logout
);

router.route('/:id').get(authController.restrictTo('admin'), userController.getUser);

module.exports = router;
