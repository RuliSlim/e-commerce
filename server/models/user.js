'use strict';
const { hashPassword } = require('../helpers/bcrypt.js');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    phone: {
      type: DataTypes.STRING,
    },
    avatar: {
      type: DataTypes.STRING
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
  };
  return User;
};