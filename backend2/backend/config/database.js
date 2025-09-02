const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME || 'furecomdb',
  process.env.DB_USER || 'root',
  process.env.DB_PASS || 'mysqlroot1912',
  {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 3306,
    dialect: 'mysql',
    logging: console.log, // Set to true to enable SQL logging
  }
);

sequelize.authenticate()
  .then(() => console.log('✅ Database connected successfully!'))
  .catch((error) => {
    console.error('❌ Error connecting to the database:');
    console.error(`Error message: ${error.message}`);
    console.error(`Error stack: ${error.stack}`);
  });

module.exports = sequelize;
