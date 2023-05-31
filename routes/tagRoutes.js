const express = require('express');
const router = express.Router();
const tagController = require('../controllers/tagController');
// const auth = require('.././middleware/auth');
// router.use(auth)


router.route('/')
    .post(tagController.addTag)
    .get(tagController.getAllTags)
    .delete(tagController.deleteAllTags)

router.route('/:id')
    .get(tagController.getTag)
    .patch(tagController.editTag)
    .delete(tagController.deleteTag)

module.exports = router