'use strict';
const { hashPassword } = require('../helpers/bcrypt.js');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'First Name cannot be empty'
        }
      }
    },
    lastName: {
      type: DataTypes.STRING,
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