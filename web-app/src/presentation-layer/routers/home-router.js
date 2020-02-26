const express = require('express')
const router = express.Router()

const container = require('../../main')
const internshipManager = container.resolve('internshipManager')

// Index
router.get('/', function(request, response) {
    response.render('home.hbs')
})

router.get('/search', function(request, response) {

    var type = request.query.type

    if (type == null || type == '') {
        type = 'recruiter'
    }

    internshipManager.searchAdverts(type, request.query.q, function(status, advertsOrError) {
        if (status) {
            response.render('search.hbs')
            //response.send(advertsOrError)
        } else {
            response.send(advertsOrError)
        }
    })
})

module.exports = router