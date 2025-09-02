const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Order = require('./orderModel');

const PaymentDetails = sequelize.define('PaymentDetails', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    orderId: { 
        type: DataTypes.INTEGER, 
        allowNull: false,
        references: { model: Order, key: 'id' },
        onDelete: 'CASCADE'
    },
    paymentMethod: { type: DataTypes.STRING, allowNull: false },
    paymentStatus: { 
        type: DataTypes.STRING, 
        allowNull: false,
        validate: { isIn: [['Pending', 'Completed', 'Failed', 'Paid']] }

    }
}, { 
    tableName: 'PaymentDetails', 
    timestamps: false
});

Order.hasMany(PaymentDetails, { foreignKey: 'orderId', onDelete: 'CASCADE' });
PaymentDetails.belongsTo(Order, { foreignKey: 'orderId' });

module.exports = PaymentDetails;