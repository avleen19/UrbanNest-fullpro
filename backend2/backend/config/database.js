const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME ,
  process.env.DB_USER ,
  process.env.DB_PASS ,
  {
    host: process.env.DB_HOST ,
    port: process.env.DB_PORT,
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
