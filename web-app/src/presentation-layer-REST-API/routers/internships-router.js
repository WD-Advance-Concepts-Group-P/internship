const express = require('express')
const router = express.Router()
const container = require('../../main')
const authHelper = require('../../util/auth-helper')
const internshipManager = container.resolve('internshipManager')

router.route('/adverts')
    .all(function(request, response, next) {
        next();
    })
    .get(function(request, response, next) {
        //get all adverts or logged in user adverts
        if (request.query.type === 'student') {
            internshipManager.getALlStudentAdverts(function(status, errorOrAdvert) {
                if (status) {
                    response.json({
                        'error': 'false',
                        'advert': errorOrAdvert
                    })
                } else {
                    response.json({
                        'error': 'true',
                        'message': errorOrAdvert,
                        'code': 'APP_ERR'
                    })
                }
            })
        } else if (request.query.type === 'recruiter') {
            internshipManager.getALlRecruiterAdverts(function(status, errorOrAdvert) {
                if (status) {
                    response.json({
                        'error': 'false',
                        'advert': errorOrAdvert
                    })
                } else {
                    response.json({
                        'error': 'true',
                        'message': errorOrAdvert,
                        'code': 'APP_ERR'
                    })
                }
            })
        } else {
            // get all adverts for the logged in user
            response.json({
                'error': 'true',
                'message': errorOrAdvert,
                'code': 'APP_ERR'
            })
        }

        console.log(request.params.type)
    })
    .post(authHelper.apiIsAuthenticated, function(request, response, next) {
        //create advert
    })

router.route('/advert/:id')
    .all(function(request, response, next) {
        next();
    })
    .get(function(request, response, next) {
        //get advert
        internshipManager.getAdvertById(request.params.id, request.query.type, function(status, errorOrAdvert) {
            if (status) {
                response.json({
                    'error': 'false',
                    'advert': errorOrAdvert
                })
            } else {
                response.json({
                    'error': 'true',
                    'message': errorOrAdvert,
                    'code': 'APP_ERR'
                })
            }
        })
    })
    .patch(authHelper.apiIsAuthenticated, function(request, response, next) {
        //update advert
        if (request.query.type === 'student') {
            internshipManager.updateStudentAdvert(request.session.user, request.query.id, request.body.title, request.body.body, request.body.field, request.body.contact, request.body.startdate, request.body.enddate, function(status, errorOrId) {
                if (status) {
                    response.redirect('/my/adverts')
                } else {
                    response.send('server error')
                }
            })
        } else if (request.query.type === 'recruiter') {
            internshipManager.updateRecruiterAdvert(request.session.user, request.query.id, request.body.title, request.body.body, request.body.field, request.body.city, request.body.website, request.body.contact, request.body.positions, request.body.deadline_date, function(status, errorOrId) {
                if (status) {
                    response.redirect('/my/adverts')
                } else {
                    response.send('server error')
                }
            })
        } else {
            response.json({
                'error': 'invalid type',
                'message': 'invalid type submitted (student or recruiter are valid)',
                'code': 'TYPE_1'
            })
        }
    })
    .delete(authHelper.apiIsAuthenticated, function(request, response, next) {
        //delete advert
    })
    
module.exports = router