const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Country = sequelize.define(
    'Country',
    {
        countryid: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true, // Fix typo here (autoincrement → autoIncrement)
        },
        CountryName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        tableName: 'Country', // ✅ Explicitly specify the table name
        timestamps: false, // ✅ Disable timestamps if your table doesn't have createdAt/updatedAt
    }
);

module.exports = Country;
