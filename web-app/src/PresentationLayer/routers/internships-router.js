const express = require('express')
const router = express.Router()

router.route('/create-position')
    .get(function(request, response, next) {
        response.send('test')
    })
    .post(function(request, response, next) {
        response.send('test')
    })

router.get('/positions', function(request, response) {
    response.send('alla praktikplatser')
})
    
module.exports = router