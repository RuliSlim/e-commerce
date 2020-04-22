const express = require('express');
const router = express.Router();

router.use('/', require('./user'));
router.use('/products', require('./product'));
router.use('/carts', require('./cart'));

module.exports = router;