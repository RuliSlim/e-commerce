const { User }            = require('../models');
const uuid                = require('uuid/v4');
const JWT                 = require('../helpers/jwt');
const { comparePassword } = require('../helpers/bcrypt');
const createError         = require('http-errors');

class UserController {
  static register (req, res, next) {
    const { name, email, password } = req.body;
    User
      .create({id: uuid(), name, email, password})
      .then(user => {
        const token = JWT.signToken(user);
        res.status(201).json({ user, access_token: token });
      })
      .catch(err => next(err));
  }

  static login (req, res, next) {
    const { email, password } = req.body;
    User
      .findOne ({where: {email}})
      .then(user => {
        if (!user) throw createError(400, 'email or password does not match');
        if (!comparePassword(password, user.password)) throw createError(400, 'email or password does not match');
        const token = JWT.signToken(user);
        res.status(200).json({ user, access_token: token });
      })
      .catch(err => next(err));
  }
}

module.exports = UserController;