const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Category = sequelize.define('Category', {
  Categoryid: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    field: 'Categoryid'
  },
  CategoryName: {
    type: DataTypes.STRING(300),
    allowNull: false,
    field: 'CategoryName'  
  }
}, {
  tableName: 'Category', 
  timestamps: false
});

module.exports = Category;
