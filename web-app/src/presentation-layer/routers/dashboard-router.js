const express = require('express')
const router = express.Router()

router.get('/', function(request, response) {
    response.render('dashboard.hbs')
})

router.route('/update')
    .get(function(request, response, next) {
        response.send('test')
    })
    .post(function(request, response, next) {
        response.send('test')
    })

module.exports = router