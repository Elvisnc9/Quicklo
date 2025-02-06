const express = require('express');
const router = express.Router();
const path = require('path')
const mainController = require('../controllers/mainController');
const { checkAuthenticated, checkNotAuthenticated } = require('../middlewares/security');


router.get('/' , mainController.onboarding);
router.get('/homepage', checkAuthenticated, (req, res) => {
     res.sendFile( path.join(__dirname, '../../views/main.html'))
});


module.exports= router;