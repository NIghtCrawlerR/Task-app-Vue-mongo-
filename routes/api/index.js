const express = require('express');
const router = express.Router();

router.use('/users', require('./users'))
router.use('/routes', require('./routes'))

module.exports = router