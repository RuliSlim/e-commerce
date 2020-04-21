const express        = require('express');
const router         = express.Router();
const CartController = require('../controllers/cart');

/* GET users listing. */
router.get('/', CartController.getAll);
router.post('/', CartController.create);
router.put('/:id', CartController.updateOne);
router.delete('/:id', CartController.deleteOne);
router.post('/:id/checkout', CartController.checkout);

module.exports = router;