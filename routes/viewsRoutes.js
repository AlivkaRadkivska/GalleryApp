const express = require('express');
const router = express.Router();
const viewController = require('../controllers/viewsControler');

router.get('/', viewController.getMainPage);

module.exports = router;