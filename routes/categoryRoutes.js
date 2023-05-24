const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
// const auth = require('.././middleware/auth');
// router.use(auth)


router.route('/')
    .post(categoryController.addCategory)
    .get(categoryController.getAllCategories)
    .delete(categoryController.deleteAllCategories)

router.route('/:id')
    .get(categoryController.getCategory)
    .patch(categoryController.editCategory)
    .delete(categoryController.deleteCategory)


module.exports = router