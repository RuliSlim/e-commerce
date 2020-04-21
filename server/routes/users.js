const express        = require('express');
const router         = express.Router();
const UserController = require('../controllers/user');

/* GET users listing. */
router.post('/register', UserController.register);
router.post('/register', UserController.login);

module.exports = router;