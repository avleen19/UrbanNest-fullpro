// models/state.js
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const State = sequelize.define('State', {
    StateId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    StateName: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'State', // Ensure the name is correct (case-sensitive)
    timestamps: false  // Disable if no timestamp columns exist in your table
});

module.exports = State;
