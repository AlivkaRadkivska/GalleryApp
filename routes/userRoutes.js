const express = require('express');
const router = express.Router();
const userController = require('./../controllers/userController');
const authController = require('./../controllers/authController');


router.route('/')
  .get(userController.getAllUsers)
  .delete(userController.deleteAllUsers)

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.post('/logout', authController.logout);


router.use(authController.protect)

router.get('/me', userController.getCurrUser);
router.patch('/update-password', authController.updatePassword);
router.patch('/update-info', userController.updateCurrUser);

router.route('/:id')
  .get(userController.getUser)
  .delete(userController.deleteUser)

module.exports = router