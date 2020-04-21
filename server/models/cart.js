'use strict';
module.exports = (sequelize, DataTypes) => {
  const Cart = sequelize.define('Cart', {
    UserId: {
      type: DataTypes.UUID,
    },
    ProductId: {
      type: DataTypes.INTEGER
    },
    amount: {
      type: DataTypes.INTEGER
    }
  }, {});
  Cart.associate = function(models) {
    // associations can be defined here
    Cart.belongsTo(models.Product);
    Cart.belongsTo(models.User);
  };
  return Cart;
};