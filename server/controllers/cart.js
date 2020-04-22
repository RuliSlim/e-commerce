const { Cart, User, Product } = require('../models');
const createError             = require('http-errors');

class CartController {
  static getAll (req, res, next) {
    const id = req.user.id;
    User
      .findAll({where: { id }, include: [{ all: true }]})
      .then(cart => {
        res.status(200).json(cart);
      })
      .catch(err => next(err));
  }

  static create (req, res, next) {
    const UserId = req.user.id;
    const { amount, ProductId } = req.body;
    Cart
      .findOne({ where: { UserId, ProductId }})
      .then(cart => {
        if(!cart) return  Cart.create({ UserId, ProductId, amount });
        cart.amount += amount;
        return Cart.update({amount: cart.amount});
      })
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
        if(!cart) throw createError(404, 'Cart not found');
        res.status(200).json(cart);
      })
      .catch(err => next(err));
  }

  static deleteOne (req, res, next) {
    const UserId = req.user.id;
    Cart
      .destroy({where: { UserId }})
      .then(() => {
        res.status(200).json({message: 'Successfully delete cart'});
      })
      .catch(err => next(err));
  }

  static async checkout (req, res, next) {
    // console.log('MASUUUUK')
    try {
      let { cart } = req.body;
      console.log(req.body, 'CARt<<<<<<<<<,');
      for (let i in cart) {
        await Cart
          .findOne({where: {id: cart[i]}})
          .then(cart => {
            console.log(cart, 'CART KIH CUK MUMET')
            return Product
              .update({ stock: cart.amount }, { where: { id: cart.ProductId }});
          })
          .then(() => {
            console.log('masuk ke berapa kali ini cuk')
          })
          .catch(err => next(err));
        }
      res.status(200).json({message: 'Successfully checkout'})
    } catch(err) {
      next(err);
    }
  }
}

module.exports = CartController;