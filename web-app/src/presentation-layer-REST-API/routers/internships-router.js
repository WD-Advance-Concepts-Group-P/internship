const express = require('express')
const router = express.Router()
const container = require('../../main')
const authHelper = require('../../util/auth-helper')
const internshipManager = container.resolve('internshipManager')
const jwt = require('jsonwebtoken');

const USER_TYPE_STUDENT = 1
const USER_TYPE_RECRUITER = 2

router.route('/adverts')
    .all(function(request, response, next) {
        next();
    })
    .get(function(request, response, next) {
        //get all adverts or logged in user adverts
        if (request.query.type == 'student') {
            internshipManager.getAllAdverts(USER_TYPE_STUDENT)
                .then(adverts => {
                    response.json({
                        'error': 'false',
                        'advert': adverts
                    })
                })
                .catch(error => {
                    response.status(500).json({
                        'error': 'true',
                        'message': 'Server error',
                    })
                })
        } else if (request.query.type == 'recruiter') {
            internshipManager.getAllAdverts(USER_TYPE_RECRUITER)
                .then(adverts => {
                    response.json({
                        'error': 'false',
                        'advert': adverts
                    })
                })
                .catch(error => {
                    response.status(500).json({
                        'error': 'true',
                        'message': 'Server error',
                    })
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
                        })
                    } else {

                        const user = { 
                            id: decoded.uid,
                            user_type: decoded.userType
                        }

                        internshipManager.getAllAdvertsByUser(user)
                            .then(adverts => {
                                response.json({
                                    'error': 'false',
                                    'advert': adverts
                                })
                            })
                            .catch(error => {
                                if (error.includes('db error')) {
                                    response.status(500).json({
                                        'error': 'true',
                                        'message': 'Server error',
                                    })
                                } else {
                                    response.status(400).json({
                                        'error': 'true',
                                        'message': error,
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
                user_type: response.locals.userType,
                id: response.locals.uid
            }

            const values = {
                title: request.body.title,
                body: request.body.body,
                field: request.body.field,
                contact: request.body.contact,
                start_date: request.body.startdate,
                end_date: request.body.enddate,
            }
        
            internshipManager.createAdvert(values, user)
                .then(() => {
                    response.status(201).json()
                })
                .catch(error => {
                    if (error.includes('db error')) {
                        response.status(500).json({
                            'error': 'true',
                            'message': 'Server error',
                        })
                    } else {
                        response.status(400).json({
                            'error': 'true',
                            'message': errorOrId,
                        })
                    }
                })

        } else if (response.locals.userType === 2) {
            const user = {
                user_type: response.locals.userType,
                id: response.locals.uid
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
        
            internshipManager.createAdvert(values, user)
                .then(() => {
                    response.status(201).json()
                })
                .catch(error => {
                    if (error.includes('db error')) {
                        response.status(500).json({
                            'error': 'true',
                            'message': 'Server error',
                        })
                    } else {
                        response.status(400).json({
                            'error': 'true',
                            'message': errorOrId,
                        })
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

        internshipManager.getAdvertById(request.params.id, request.query.type)
            .then(advert => {
                response.json({
                    'error': 'false',
                    'advert': advert
                })
            })
            .catch(error => {
                if (errorOrAdvert.includes("db error")) {
                    response.status(500).json({
                        'status': 'fail',
                        'message': 'Server error'
                    })
                } else {
                    response.status(400).json({
                        'status': 'fail',
                        'message': error
                    })
                }
            })
    })
    .put(authHelper.apiIsAuthenticated, function(request, response, next) {
        //update advert
        const user = {
            user_type: response.locals.userType,
            id: response.locals.uid
        }
        if (request.query.type === 'student') {
            const values = {
                title: request.body.title,
                body: request.body.body,
                field: request.body.field,
                contact: request.body.contact,
                start_date: request.body.startdate,
                end_date: request.body.enddate,
            }
        
            internshipManager.updateAdvert(user, values, request.params.id)
                .then(() => {
                    response.status(201).json()
                })
                .catch(error => {
                    if (error.includes("db error")) {
                        response.status(500).json({
                            'status': 'fail',
                            'message': 'Server error'
                        })
                    } else {
                        response.status(400).json({
                            'status': 'fail',
                            'message': errorOrId
                        })
                    }
                })

        } else if (request.query.type === 'recruiter') {
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

            internshipManager.updateAdvert(request.session.user, values, request.body.id)
                .then(() => {
                    response.status(201).json()
                })
                .catch(error => {
                    if (error.includes("db error")) {
                        response.status(500).json({
                            'status': 'fail',
                            'message': 'Server error'
                        })
                    } else {
                        response.status(400).json({
                            'status': 'fail',
                            'message': error
                        })
                    }
                })
        } else {
            response.status(400).json({
                'error': 'true',
                'message': 'invalid type submitted (student or recruiter are valid)',
            })
        }
    })
    .delete(authHelper.apiIsAuthenticated, function(request, response, next) {
        const user = { 
            id: response.locals.uid,
            user_type: response.locals.userType
        }

        internshipManager.deleteAdvert(request.params.id, user)
            .then(() => {
                response.status(201).json()
            })
            .catch(error => {
                if (error.includes('db error')) {
                    response.status(500).json({
                        'error': 'true',
                        'message': 'server error',
                    })
                } else {
                    response.status(400).json({
                        'error': 'true',
                        'message': error,
                    })
                }
            })
    })
    
module.exports = router