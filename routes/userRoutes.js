const express = require('express');
const router = express.Router();
const userController = require('./../controllers/userController');
const authController = require('./../controllers/authController');

router.route('/')
  // .get(authController.protect, authController.restrictTo('admin'), userController.getAllUsers)
  .get(userController.getAllUsers) //ONLY FOR TEST
  .delete(userController.deleteAllUsers) //ONLY FOR TEST

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.post('/logout', authController.logout);


router.use(authController.protect);

router.get('/me', userController.setCurrUser, userController.getCurrUser);
router.patch('/update-password', userController.setCurrUser, authController.updatePassword);
router.patch('/update-info',
  userController.setCurrUser,
  userController.checkPasswordUpdating,
  userController.updateCurrUser);
router.delete('/me',
  userController.setCurrUser,
  authController.restrictTo('user', 'artist'),
  userController.deleteUserConnects,
  userController.deleteCurrUser)

router.route('/:id')
  .get(authController.restrictTo('admin'), userController.getUser)

module.exports = router;