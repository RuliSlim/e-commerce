const express                 = require('express');
const router                  = express.Router();
const CartController          = require('../controllers/cart');
const { authen, authorization } = require('../middlewares/auth');

/* GET users listing. */
router.get('/', authen, CartController.getAll);
router.post('/', authen, CartController.create);
router.post('/checkout', authen, CartController.checkout);
router.put('/:id', authen, authorization, CartController.updateOne);
router.delete('/:id', authen, authorization, CartController.deleteOne);

module.exports = router;