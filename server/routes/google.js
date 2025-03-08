
const express = require('express');
const router = express.Router();
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../model/user'); 
require('dotenv').config();

passport.use(new GoogleStrategy({
//GOGLE DATA
}, async (accessToken, refreshToken, profile, done) => {
    try {
        let user = await User.findOne({ where: { googleId: profile.id } });

        if (user) {
            return done(null, user);
        }

        const newUser = await User.create({
            googleId: profile.id,
            displayName: profile.displayName,
            authMethod: 'google'
        });

        return done(null, newUser);
    } catch (err) {
        console.error('Error in Google strategy:', err);
        return done(err, null);
    }
}));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findByPk(id);
        done(null, user);
    } catch (err) {
        done(err, null);
    }
});

// Google Login Route
router.get('/auth/google', passport.authenticate('google', { scope: ['email', 'profile'] }));

// Google OAuth Callback
router.get('/google/callback', 
    passport.authenticate('google', { failureRedirect: '/login-failure', successRedirect: '/homepage' })
);

// Login Failure Route
router.get('/login-failure', (req, res) => {
    res.send('Something went wrong...');
});

// Logout Route
router.get('/logout', (req, res) => {
    req.logout((err) => {
        if (err) {
            console.error('Error logging out:', err);
            res.send('Error logging out.');
        } else {
            res.redirect('/');
        }
    });
});

module.exports = router;






