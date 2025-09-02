// models/permissionModel.js
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');  // Make sure this path is correct

const Permission = sequelize.define('PermissionMaster', {
  PermissionId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  Permission: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'PermissionMaster',
  timestamps: false,  // If your table doesn't have createdAt and updatedAt
});

module.exports = Permission;
