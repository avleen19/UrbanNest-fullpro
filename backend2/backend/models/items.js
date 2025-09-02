const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Category = require('./Category'); 
const Product = require('./Product');  

const Item = sequelize.define('Item', {
  ItemId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  ItemName: {
    type: DataTypes.STRING(300),
    allowNull: false
  },
  Description: {
    type: DataTypes.STRING(1000),
    allowNull: true
  },
  UnitPrice: {
    type: DataTypes.DECIMAL(18, 2),
    allowNull: true
  },
  Quantity: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  Qty_Reorder: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  ImageURL: {
    type: DataTypes.STRING(500),
    allowNull: true
  },
  CategoryId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Category,
      key: 'CategoryId'
    }
  },
  ProductId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Product,
      key: 'ProductId'
    }
  },
}, {
  timestamps: true,
});
Item.belongsTo(Category, { foreignKey: 'CategoryId' });
Item.belongsTo(Product, { foreignKey: 'ProductId' });

module.exports = Item;
