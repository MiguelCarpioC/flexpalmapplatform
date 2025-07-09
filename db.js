require('dotenv').config();
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.MYSQLDATABASE, process.env.MYSQLUSER, process.env.MYSQLPASSWORD, {
  host: process.env.MYSQLHOST,  // IP de Google Cloud SQL
  port: process.env.MYSQLPORT || 3306,
  dialect: 'mysql',
  dialectOptions: {
    connectTimeout: 60000, // Evita errores de timeout
  },
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

module.exports = sequelize;
