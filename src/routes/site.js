const express = require('express');
const router = express.Router();
const siteController = require('../controllers/SiteController');

router.get('/sign-in', siteController.signIn);
router.get('/sign-out', siteController.signOut);
router.post('/handle-sign-in', siteController.handleSignIn);
router.get('/', siteController.homePage);

module.exports = router;
