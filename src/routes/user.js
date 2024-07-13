const express = require('express');
const router = express.Router();
const userController = require('../controllers/UserController');

router.get('/', userController.listUsers);
router.get('/lock-users', userController.lockUsers);
router.get('/lock/:id', userController.lock);
router.get('/unlock-users', userController.unlockUsers);
router.get('/unlock/:id', userController.unlock);

module.exports = router;
