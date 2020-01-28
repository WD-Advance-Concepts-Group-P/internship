const express = require('express')
const router = express.Router()

router.route('/login')
    .get(function(response, request, next) {
        response.send('test')
    })
    .post(function(response, request, next) {
        response.send('test')
    })


router.get('/sign-up')
    .get(function(response, request, next) {
        response.send('test')
    })
    .post(function(response, request, next) {
        response.send('test')
    })


router.get('/forgotten-password')
    .get(function(response, request, next) {
        response.send('test')
    })
    .post(function(response, request, next) {
        response.send('test')
    })


module.exports = router