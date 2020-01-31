const express = require('express')
const router = express.Router()

// Index
router.get('/', function(request, response) {
    response.render('home.hbs')
})

module.exports = router