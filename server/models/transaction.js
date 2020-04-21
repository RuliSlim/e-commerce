'use strict';
module.exports = (sequelize, DataTypes) => {
  const Transaction = sequelize.define('Transaction', {
    total: {
      type: DataTypes.DECIMAL,
    },
    UserId: {
      type: DataTypes.UUID
    }
  }, {sequelize});
  Transaction.associate = function(models) {
    // associations can be defined here
    Transaction.belongsTo(models.User);
  };
  return Transaction;
};