const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const User = require('../model/user'); 

function initialize(passport) {
  const authenticateUser = async (email, password, done) => {
    try {
        console.log("🔍 Checking user for email:", email);
        
        const user = await User.findOne({ where: { email, authMethod: 'jwt' } });
        if (!user) {
            console.log("❌ User not found!");
            return done(null, false, { message: 'No user with that email' });
        }

        console.log("✅ User found:", user.email);
        console.log("🔑 Stored password hash:", user.password);
        console.log("🔑 Entered password:", password);

        const isMatch = await bcrypt.compare(password, user.password);
        console.log("🔍 Password Match:", isMatch);

        if (isMatch) {
            return done(null, user);
        } else {
            console.log("❌ Password does not match!");
            return done(null, false, { message: 'Password incorrect' });
        }
    } catch (e) {
        console.error("⚠️ Authentication error:", e);
        return done(e);
    }
};

  passport.use(new LocalStrategy({ usernameField: 'email' }, authenticateUser));

  passport.serializeUser((user, done) => done(null, user.id));

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findByPk(id); 
      done(null, user);
    } catch (error) {
      done(error);
    }
  });
}

module.exports = initialize;
