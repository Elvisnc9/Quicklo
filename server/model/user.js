
const { DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const {sequelize} = require('../config/db'); 

const User = sequelize.define('UserData', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  username: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: true 
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: true 
  },
  googleId: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: true
  },
  displayName: {
    type: DataTypes.STRING
  },
  authMethod: {
    type: DataTypes.ENUM('jwt', 'google'),
    allowNull: false
  }
}, {
  timestamps: true 
});



// Compare password method
User.prototype.comparePassword = async function(password) {
  if (this.authMethod !== 'jwt') {
    throw new Error('This user did not sign up with JWT');
  }
  return await bcrypt.compare(password, this.password);
};

module.exports = User;














// const mongoose = require('mongoose');
// const bcrypt = require('bcrypt');

// const userSchema = new mongoose.Schema({
//   username: { type: String, unique: true, sparse: true }, 
//   email: { type: String, unique: true, sparse: true }, 
//   password: { type: String }, 
//   googleId: { type: String, unique: true},
//   displayName: { type: String },
//   authMethod: { type: String, required: true, enum: ['jwt', 'google'] }, 
// });


// userSchema.methods.comparePassword = async function(password) {
//   if (this.authMethod !== 'jwt') {
//     throw new Error('This user did not sign up with JWT');
//   }
//   return await bcrypt.compare(password, this.password);
// };

// const User = mongoose.model('User', userSchema);
// module.exports = User;