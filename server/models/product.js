'use strict';
const createError = require('http-errors');

module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    sold: {
      type: DataTypes.INTEGER,
    }
  }, {
    hooks: {
      beforeCreate: (product) => {
        if(product.price < 0) {
          throw createError('Product price cannot be negative.');
        }
        product.sold = 0;
      }
    }
  });
  Product.associate = function(models) {
    // associations can be defined here
    // Product.hasMany(models.Sold);
    Product.belongsToMany(models.User, { through: 'Cart' });
    Product.hasMany(models.Cart);
  };
  return Product;
};