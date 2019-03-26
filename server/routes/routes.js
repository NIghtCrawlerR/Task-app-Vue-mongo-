const express = require('express'),
mongodb = require('mongodb'),
router = express.Router()

router.get('/', (req, res) => {
    res.send('Hello')
})

module.exports = router;
