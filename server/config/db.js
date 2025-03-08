const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
   //DATABASE VARIABLES
    {
        host: "localhost", 
        dialect: "mysql",
        port: process.env.PORT,
        logging: false 
    }
);

const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('MySQL Database Connected ✅');
    } catch (err) {
        console.error('Error connecting to MySQL:', err);
        process.exit(1);
    }
};

module.exports = { sequelize, connectDB };
