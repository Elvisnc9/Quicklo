const bcrypt = require('bcrypt');
const User = require('../model/user');
const { Op } = require('sequelize');


exports.registerUser = async (req, res, next) => {
  const { username, email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false, message: "Email and password are required"
    });
  }

  try {
    console.log("Received Registration Request:", req.body);



    const existingUser = await User.findOne({
      where: {
        [Op.or]: [{ username }, { email }]
      }
    });

    if (existingUser) {
      return res.status(400).json({
        success: false, message: "User already exists Please login"
      });
    }


    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      email,
      password: hashedPassword,
      authMethod: 'jwt',
    });

    console.log("User Registered Successfully:", user);

    return res.status(201).json({ success: true, message: "Account Created redirecting......." }),
      next();


  } catch (error) {
    console.error("Registration Error:", error);
    return res.status(500).json({
      success: false, message: "Server error"
    });
  }
};


exports.checkUser = async (req, res) => {
  const { username, email } = req.body;

  try {
    const user = await User.findOne({
      where: {
        [Op.or]: [{ username }, { email }]
      }
    });

    if (user) {
      const field = user.email === email ? 'email' : 'username';
      return res.status(200).json({ exists: true, field });
    }

    res.status(200).json({ exists: false });
  } catch (error) {
    console.error('Error checking user:', error);
    res.status(500).json({ message: 'Server error' });
  }
};


exports.logoutUser = (req, res) => {
  req.logout();
  res.status(201).json({ success: true, message: 'Logout successful' });
};



