const express = require('express');
const router = express.Router();

router.get('/', require('./users'));

module.exports = router;