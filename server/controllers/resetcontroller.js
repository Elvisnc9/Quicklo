const crypto = require('crypto');
const nodemailer = require('nodemailer');
const User = require('../model/password_model');
const config = require('../config'); // Import your configuration

exports.forgotPassword = async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
        return res.status(400).json({ message: 'User not found' });
    }

    const resetToken = crypto.randomBytes(32).toString('hex');
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour expiry

    await user.save();

    const resetURL = `http://localhost:9922/reset-password/${resetToken}`;

    // Configure Nodemailer transporter
    const transporter = nodemailer.createTransport({
        service: config.email.service,
        auth: {
            user: config.email.auth.user,
            pass: config.email.auth.pass
        }
    });

    const mailOptions = {
        to: user.email,
        subject: 'Password Reset',
        text: `Click this link to reset your password: ${resetURL}`
    };

    transporter.sendMail(mailOptions, (err) => {
        if (err) {
            return res.status(500).json({ message: 'Error sending email' });
        }
        res.json({ message: 'Password reset link sent!' });
    });
};
