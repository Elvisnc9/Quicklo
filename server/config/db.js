const mongoose = require('mongoose');
require('dotenv').config()

const ConnectDB = async () => {
  try {
    await mongoose.connect( //add your Mongo URL HERE
       {
    });
    console.log('MongoDB Connected');
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

module.exports = ConnectDB;
