const express = require('express');
const passport = require('passport');
const userController = require('../controllers/userController');
const { checkAuthenticated, checkNotAuthenticated } = require('../middlewares/security');



const router = express.Router();

router.post('/register', userController.registerUser);
router.post('/check-user', userController.checkUser);
router.post("/login", checkNotAuthenticated, (req, res, next) => {
  if (!req.body.email || !req.body.password) {
    return res.status(400).json({ success: false, message: "Email and password are required" });
  }

  passport.authenticate("local", (err, user, info) => {
    if (err) return res.status(500).json({ success: false, message: "Server error. Please try again later." });
    if (!user) return res.status(400).json({ success: false, message: "Wrong email or password" });

    req.logIn(user, (err) => {
      if (err) return res.status(500).json({ success: false, message: "Session error. Try again." });

      return res.status(200).json({ success: true, message: "Login successful! Redirecting..." });
    });
  })(req, res, next);
});


router.post('/error', (req, res) => {
  res.json({ success: false, message: 'Error: Wrong Password or email' });
});
router.get('/logout', userController.logoutUser);

module.exports = router;