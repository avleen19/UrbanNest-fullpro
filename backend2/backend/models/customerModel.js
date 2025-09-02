const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Customer = sequelize.define('Customer', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  phone: {   // ✅ Added phone field
    type: DataTypes.STRING,
    allowNull: false, // If your database does not allow NULL values
  }
}, {
  timestamps: false,
});

module.exports = Customer;
