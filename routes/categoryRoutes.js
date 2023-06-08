const express = require('express');
const router = express.Router();
const categoryController = require('./../controllers/categoryController');
const authController = require('./../controllers/authController');

router.get('/', categoryController.getAllCategories);

router.use(authController.protect, authController.restrictTo('admin'));

router.route('/').post(categoryController.addCategory);

router
  .route('/:id')
  .patch(categoryController.updateCategory)
  .delete(
    categoryController.checkUsingForDeleting,
    categoryController.deleteCategory
  );

module.exports = router;
