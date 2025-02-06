const express = require('express');
const passport = require('passport');
const userController = require('../controllers/userController');
const { checkAuthenticated, checkNotAuthenticated } = require('../middlewares/security');



const router = express.Router();

router.post('/register', userController.registerUser);
router.post('/check-user', userController.checkUser);
router.post('/login', checkNotAuthenticated , (req, res, next) => {
  if (!req.body.email || !req.body.password) {
    return res.redirect('/homepage');
  }
  passport.authenticate('local', (err, user, info) => {
    if (err) { return res.json({ success: false, message: 'Server error. Please try again later.' }); }
    if (!user) { return res.json({ success: false, message: 'Wrong credentials' }); }
    req.logIn(user, (err) => {
      if (err) { return res.json({ success: false, message: 'Server error. Please try again later.' }); }
      return res.redirect('/homepage');
    });
  })(req, res, next);
});
router.post('/error', (req, res) => {
  res.json({ success: false, message: 'Error: Wrong Password or email' });
});
router.get('/logout', userController.logoutUser);

module.exports = router;