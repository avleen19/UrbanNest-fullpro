const { DataTypes } = require('sequelize'); // ✅ Required to use DataTypes
const sequelize = require('../config/database'); // ✅ Required to use sequelize

const Region = sequelize.define('Region', {
    RegionId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'RegionId'
    },
    RegionName: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'Region', // must match DB table
    timestamps: false
});

module.exports = Region;
