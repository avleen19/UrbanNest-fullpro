const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Category = require('./Category');  

const Product = sequelize.define('Product', {
  ProductId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  ProductName: {
    type: DataTypes.STRING(300),
    allowNull: false
  },
  ProductDescription: {
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
    type: DataTypes.TEXT,
    allowNull: true
  },
  CategoryId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: Category,  
      key: 'CategoryId'
    }
  }
}, {
  tableName: 'Product',
  timestamps: false  
});


Product.belongsTo(Category, {
  foreignKey: 'CategoryId',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
});

module.exports = Product;
