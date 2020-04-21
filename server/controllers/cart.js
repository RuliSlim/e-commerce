const { Cart, User, Product } = require('../models');
const createError             = require('http-errors');

class CartController {
  static getAll (req, res, next) {
    const UserId = req.user.id;
    User
      .findAll({where: { UserId }, include: [{ all: true }]})
      .then(cart => {
        res.status(200).json(cart);
      })
      .catch(err => next(err));
  }

  static create (req, res, next) {
    const UserId = req.user.id;
    const { amount, ProductId } = req.body;
    Cart
      .create({ UserId, ProductId, amount })
      .then(cart => {
        res.status(201).json(cart);
      })
      .catch(err => next(err));
  }

  static updateOne (req, res, next) {
    const UserId = req.user.id;
    const { amount, ProductId } = req.body;
    Cart
      .update({ ProductId, amount}, {where: { UserId }, returning: true})
      .then(cart => {
        res.status(200).json(cart);
      })
      .catch(err => next(err));
  }

  static deleteOne (req, res, next) {
    const UserId = req.user.id;
    Cart
      .destroy({where: { UserId }})
      .then(cart => {
        res.status(200).json({message: 'Successfully delete cart'})
      })
      .catch(err => next(err));
  }

  // static checkout (req, res, next) {

  // }
}

module.exports = CartController;