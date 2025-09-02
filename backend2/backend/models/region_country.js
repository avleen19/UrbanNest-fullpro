const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Country_Region = sequelize.define('Country_Region', {
  CountryId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Country',
      key: 'CountryId'
    }
  },
  RegionId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Region',
      key: 'RegionId'
    }
  }
}, {
  tableName: 'Country_Region',
  timestamps: false
});

module.exports = Country_Region;
// Region.js
Region.belongsToMany(Country, { through: 'Country_Region', foreignKey: 'RegionId' });

// Country.js
Country.belongsToMany(Region, { through: 'Country_Region', foreignKey: 'CountryId' });
