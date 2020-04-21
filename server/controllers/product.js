const { Product }   = require('../models');
const createError   = require('http-errors');

class ProductController {
  static getAll (req, res, next) {
    Product
      .findAll()
      .then(products => res.status(200).json(products))
      .catch(err => next(err));
  }

  static getOne (req, res, next) {
    const id = req.params.id;
    Product
      .findOne({where: {id}})
      .then(product => {
        if(!product) throw createError(404, 'Product not found');
        res.status(200).json(product);
      })
      .catch(err => next(err));
  }
}

module.exports = ProductController;
