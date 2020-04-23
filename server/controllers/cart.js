const { Cart, User, Product } = require('../models');
const createError             = require('http-errors');

class CartController {
  static getAll (req, res, next) {
    const id = req.user.id;
    User
      .findOne({where: { id }, include: [{ model: Cart, attributes:['id', 'amount'] ,include: [ Product ] }]})
      .then(cart => {
        res.status(200).json(cart);
      })
      .catch(err => next(err));
  }

  static create (req, res, next) {
    const UserId = req.user.id;
    const { amount, ProductId } = req.body;
    Cart
      .findOne({ where: { UserId, ProductId }, attributes: ['id', 'amount', 'UserId', 'ProductId']})
      .then(cart => {
        if(!cart) return  Cart.create({ UserId, ProductId, amount });
        let newAmount;
        if (amount == 1) {
          newAmount = Number(Number(cart.amount) + Number(amount));
        } else {
          newAmount = Number(amount);
        }
        return Cart.update(
          { 
            amount: newAmount, UserId, ProductId 
          }, { where: { id: cart.id }, returning: true});
      })
      .then(cart => {
        if (cart.length) {
          let [ cartSend ] = cart[1];
          res.status(201).json(cartSend);
        } else {
          res.status(201).json(cart);
        }
      })
      .catch(err => next(err));
  }

  static updateOne (req, res, next) {
    const UserId = req.user.id;
    const { amount, ProductId, id } = req.body;
    Cart
      .update({ ProductId, amount}, {where: { UserId, ProductId, id }, returning: true })
      .then(cart => {
        if(!cart) throw createError(404, 'Cart not found');
        return Cart.findOne(
          {
            where: { id, UserId, ProductId }, 
            include:[{ model: Product }],
            attributes:['id', 'amount', 'ProductId']
          });
      })
      .then(cart => {
        res.status(200).json(cart);
      })
      .catch(err => next(err));
  }

  static deleteOne (req, res, next) {
    const UserId = req.user.id;
    const id = req.params.id;
    Cart
      .destroy({where: { UserId, id }})
      .then(() => {
        res.status(200).json({message: 'Successfully delete cart'});
      })
      .catch(err => next(err));
  }

  static async checkout (req, res, next) {
    // console.log('MASUUUUK')
    try {
      let cart  = req.body;
      for (let i in cart) {
        await Cart
          .findOne({where: {id: cart[i].CartId}})
          .then(cart => {
            // console.log(cart, 'CART KIH CUK MUMET');
            return Product
              .findOne({ where: { id: cart.ProductId }});
          })
          .then((product) => {
            console.log(product.stock, '><<<<<<<<<');
            let stock = product.stock - cart[i].amount;
            let name = product.name;
            let image = product.image;
            let price = product.price;
            let sold = product.sold + cart[i].amount;
            return Product
              .update({
                name, image, price, stock, sold
              }, { where: { id: product.id }});
          })
          .then(() => {
            return Cart
              .destroy({ where: { id: cart[i].CartId }});
          })
          .catch(err => next(err));
      }
    } catch(err) {
      next(err);
    } finally {
      res.status(200).json({message: 'Successfully checkout'});
    }
  }
}

module.exports = CartController;