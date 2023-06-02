const express = require('express');
const router = express.Router();
const tagController = require('./../controllers/tagController');
const authController = require('./../controllers/authController');

router.get('/', tagController.getAllTags)

router.use(authController.protect, authController.restrictTo('admin'));

router.route('/')
    .post(tagController.addTag)
    .delete(tagController.deleteAllTags) //ONLY FOR TEST

router.route('/:id')
    .patch(tagController.updateTag)
    .delete(tagController.checkUsingForDeleting, tagController.deleteTag)

module.exports = router;