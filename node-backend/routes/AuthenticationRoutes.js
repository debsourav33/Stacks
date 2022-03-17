const express = require('express');

const UserInfo = require('../models/UserInfo');
const AuthenticationController = require('../controllers/AuthenticationController');

const router = express.Router();
const controller = new AuthenticationController();

router.get('/', controller.authenticate);


module.exports = router;
