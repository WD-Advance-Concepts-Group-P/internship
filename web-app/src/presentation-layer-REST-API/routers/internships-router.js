const express = require('express')
const router = express.Router()

router.route('/advert')
    .all(function(request, response, next) {
        next();
    })
    .get(function(request, response, next) {
        //get all adverts or logged in user adverts
    })
    .post(function(request, response, next) {
        //create advert
    })

router.route('/advert/:id')
    .all(function(request, response, next) {
        next();
    })
    .get(function(request, response, next) {
        //get advert
    })
    .patch(function(request, response, next) {
        //update advert
    })
    .delete(function(request, response, next) {
        //delete advert
    })
    
module.exports = router