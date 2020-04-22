'use strict';
const { hashPassword } = require('../helpers/bcrypt.js');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Name cannot be empty'
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      unique: {
        args: true,
        msg: 'Email already taken'
      },
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Email cannot be empty'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Password cannot be empty'
        }
      }
    },
    role: {
      type: DataTypes.ENUM('admin', 'custommer'),
      allowNull: false,
      defaultValue: 'customer'
    }
  }, {
    hooks: {
      beforeCreate: (user) => {
        let hashedPassword = hashPassword(user.password);
        user.password = hashedPassword;
      }
    }, sequelize
  });
  User.associate = function(models) {
    // associations can be defined here
    User.hasMany(models.Transaction);
    User.belongsToMany(models.Product, { through: 'Cart' });
    User.hasMany(models.Cart);
  };
  return User;
};