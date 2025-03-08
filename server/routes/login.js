const express = require('express');
const router = express.Router();
const path = require('path');
const authController = require('../controllers/authController');



router.get('/auth',  authController.login ) ;

router.get('/passwordreset', authController.Passwordreset);


module.exports= router