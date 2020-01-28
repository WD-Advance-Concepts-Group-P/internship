const express = require('express')
const router = express.Router()

// Index
router.get('/', function(request, response) {
    response.send('test')
})

module.exports = router