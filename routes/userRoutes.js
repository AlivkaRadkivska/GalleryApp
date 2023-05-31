const express = require('express');
const router = express.Router();
const userController = require('./../controllers/userController');
// const auth = require('../middleware/auth');
// router.use(auth)


router.route('/')
  .post(userController.addUser)
  .get(userController.getAllUsers)
  .delete(userController.deleteAllUsers)

router.route('/login')
  .get(userController.loginUser);

router.route('/logout')
  .get(userController.logoutUser);

router.route('/:id')
  .get(userController.getUser)
  .patch(userController.editUser)
  .delete(userController.deleteUser)

module.exports = router