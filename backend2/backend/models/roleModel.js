const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Role = sequelize.define('RoleMaster', {
    RoleId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    RoleName: {
        type: DataTypes.STRING,
        allowNull: false, // This ensures RoleName cannot be null
    },
}, {
    tableName: 'RoleMaster', // Ensure the table name is exactly the same as your DB
    timestamps: false, // If you're not using createdAt/updatedAt
});

module.exports = Role;
