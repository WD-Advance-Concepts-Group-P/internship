const express = require('express')
const router = express.Router()
const container = require('../../main')
const authHelper = require('../../util/auth-helper')
const internshipManager = container.resolve('internshipManager')
const jwt = require('jsonwebtoken');

router.route('/adverts')
    .all(function(request, response, next) {
        next();
    })
    .get(function(request, response, next) {
        //get all adverts or logged in user adverts
        if (request.query.type == 'student') {
            internshipManager.getALlStudentAdverts(function(status, errorOrAdvert) {
                if (status) {
                    response.json({
                        'error': 'false',
                        'advert': errorOrAdvert
                    })
                } else {
                    response.status(500).json({
                        'error': 'true',
                        'message': errorOrAdvert,
                        'code': 'APP_ERR'
                    })
                }
            })
        } else if (request.query.type == 'recruiter') {
            internshipManager.getALlRecruiterAdverts(function(status, errorOrAdvert) {
                if (status) {
                    response.json({
                        'error': 'false',
                        'advert': errorOrAdvert
                    })
                } else {
                    response.status(500).json({
                        'error': 'true',
                        'message': errorOrAdvert,
                        'code': 'APP_ERR'
                    })
                }
            })
        } else {
            // get all adverts for the logged in user
            if (request.header('Authorization')) {
                const authHeader = request.header('Authorization')
                const token = authHeader.substr("Bearer ".length)
                jwt.verify(token, '&/yde465hw3dk.fwjbq84fv34763t6', function(error, decoded) {
                    if (error) {
                        return response.status(401).json({
                            'error': 'your not logged in',
                            'code': 'AUTH_1'
                        })
                    } else {
                        internshipManager.getAllAdvertsByUser(decoded.uid, decoded.userType, function(status, errorOrAdverts) {
                            if (status) {
                                response.json({
                                    'error': 'false',
                                    'advert': errorOrAdverts
                                })
                            } else {
                                response.json({
                                    'error': 'true',
                                    'message': errorOrAdverts,
                                    'code': 'APP_2'
                                })
                            }
                        })
                    }
                })
            } else {
                return response.status(401).json({
                    'error': 'your not logged in',
                    'code': 'AUTH_1'
                })
            }
        }
    })
    .post(authHelper.apiIsAuthenticated, function(request, response, next) {
        //create advert
        if (response.locals.userType === 1) {  
            const user = {
                'user_type': response.locals.userType,
                'id': response.locals.uid
            }

            const values = {
                title: request.body.title,
                body: request.body.body,
                field: request.body.field,
                contact: request.body.contact,
                start_date: request.body.startdate,
                end_date: request.body.enddate,
            }

            internshipManager.createStudentAdvert(user, values, function(status, errorOrId) {
                if (status) {
                    response.json({
                        'error': 'false',
                        'message': errorOrId
                    })
                } else {
                    if (errorOrId.includes('db error')) {
                        response.status(500).json({
                            'error': 'true',
                            'message': errorOrId,
                            'code': 'APP_2'
                        })
                    } else {
                        response.status(400).json({
                            'error': 'true',
                            'message': errorOrId,
                            'code': 'APP_2'
                        })
                    }
                }
            })

        } else if (response.locals.userType === 2) {
            const user = {
                'user_type': response.locals.userType,
                'id': response.locals.uid
            }

            const values = {
                title: request.body.title,
                body: request.body.body,
                field: request.body.field,
                city: request.body.city,
                contact: request.body.contact,
                website: request.body.website,
                positions: request.body.positions,
                deadline_date: request.body.deadlinedate,
            }

            internshipManager.createRecruiterAdvert(user, values, function(status, errorOrId) {
                if (status) {
                    response.json({
                        'error': 'false',
                        'message': errorOrId
                    })
                } else {
                    if (errorOrId.includes('db error')) {
                        response.status(500).json({
                            'error': 'true',
                            'message': errorOrId
                        })
                    } else {
                        response.status(400).json({
                            'error': 'true',
                            'message': errorOrId
                        })
                    }
                }
            })

        } else {
            response.status(400).json({
                'error': 'true',
                'message': 'invalid type / this is a server error'
            })
        } 
    })

router.route('/adverts/:id')
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
                    response.json({
                        'error': 'false',
                        'message': 'success updating advert'
                    })
                } else {
                    response.json({
                        'error': 'true',
                        'message': errorOrId,
                        'code': 'APP_2'
                    })
                }
            })
        } else if (request.query.type === 'recruiter') {
            internshipManager.updateRecruiterAdvert(request.session.user, request.query.id, request.body.title, request.body.body, request.body.field, request.body.city, request.body.website, request.body.contact, request.body.positions, request.body.deadline_date, function(status, errorOrId) {
                if (status) {
                    response.json({
                        'error': 'false',
                        'message': 'success updating advert'
                    })
                } else {
                    response.json({
                        'error': 'true',
                        'message': errorOrId,
                        'code': 'APP_2'
                    })
                }
            })
        } else {
            response.json({
                'error': 'true',
                'message': 'invalid type submitted (student or recruiter are valid)',
                'code': 'TYPE_1'
            })
        }
    })
    .delete(authHelper.apiIsAuthenticated, function(request, response, next) {
        //delete advert
        const user = { 
            id: response.locals.uid,
            user_type: response.locals.userType
        }

        internshipManager.deleteAdvert(request.params.id, user, function(status, error) {
            if (status) {
                response.json({
                    'error': 'false',
                    'message': 'success deleting advert'
                })
            } else {
                response.json({
                    'error': 'true',
                    'message': error,
                    'code': 'APP_2'
                })
            }
        })
    })
    
module.exports = router