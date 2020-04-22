const JWT           = require('../helpers/jwt');
const { User, Cart }      = require('../models');
const createError   = require('http-errors');

const authen = (req, res, next) => {
  const token = req.headers.access_token;
  if (JWT.decodeToken(token)) {
    req.user = JWT.decodeToken(token);
    User
      .findOne({where: { id: req.user.id }})
      .then(user => {
        if (!user) throw createError(404, 'User not found');
        next();
      })
      .catch(err => next(err));
  }
};

const authorization = (req, res, next) => {
  Cart
    .findOne({where: { id: req.params.id }})
    .then(cart => {
      // console.log(cart.UserId, req.user.id, '<<<<<<<<<<<<');
      if (!cart) throw createError(404, 'Cart not found');
      if (cart.UserId != req.user.id) throw createError(401, 'Acces denied');
      next();
    })
    .catch(err => next(err));
};

module.exports = {
  authen,
  authorization
};
