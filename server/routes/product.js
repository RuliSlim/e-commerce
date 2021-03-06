const express           = require('express');
const router            = express.Router();
const ProductController = require('../controllers/product');

/* GET users listing. */
router.get('/', ProductController.getAll);
router.get('/:id', ProductController.getOne);

module.exports = router;