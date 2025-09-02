const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./userModel');

const Order = sequelize.define('Order', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    customerId: { 
        type: DataTypes.INTEGER, 
        allowNull: false,
        references: { model: User, key: 'id' },
        onDelete: 'CASCADE'
    },
    orderDate: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
    totalAmount: { type: DataTypes.DECIMAL(10,2), allowNull: false }
}, { 
    tableName: 'Orders', 
    timestamps: false
});

User.hasMany(Order, { foreignKey: 'customerId', onDelete: 'CASCADE' });
Order.belongsTo(User, { foreignKey: 'customerId' });

module.exports = Order;