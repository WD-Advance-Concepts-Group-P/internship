const Fuse = require('fuse.js')

module.exports = function(container) {
    return {
        searchAdverts: function(type, search, callback) {
            if (type === 'student') {
                container.studentAdvertRepository.getAll().then(result => {
                    var options = {
                        shouldSort: true,
                        threshold: 0.5,
                        location: 0,
                        distance: 100,
                        maxPatternLength: 32,
                        minMatchCharLength: 2,
                        keys: [
                          "title",
                          "body", 
                          "field",
                          "contact"
                        ]
                      };
                      const fuse = new Fuse(result, options)
                      const resultStudent = fuse.search(search)
                      callback(true, resultStudent)
                }).catch(error => {
                    callback(false, error)
                })
            } else if (type === 'recruiter') {
                container.recruiterAdvertRepository.getAll().then(result => {
                    var options = {
                        shouldSort: true,
                        threshold: 0.5,
                        location: 0,
                        distance: 100,
                        maxPatternLength: 32,
                        minMatchCharLength: 2,
                        keys: [
                          "title",
                          "body", 
                          "field",
                          "contact",
                          "city",
                          "website"
                        ]
                      };
                      const fuse = new Fuse(result, options)
                      const resultRecruiter = fuse.search(search)
                      callback(true, resultRecruiter)
                }).catch(error => {
                    callback(false, error)
                })
            } else {
                callback(false, 'Invalid type')
            }
        },
        createStudentAdvert: function(user, title, body, field, contact, startDate, endDate, callback) {

            if (user.user_type === 1) {
                if (title === '' || title == null) {
                    callback(false, 'title must be supplied')
                } else if (body === '' || body == null) {
                    callback(false, 'body must be supplied')
                } else if (field === 'Choose an option' || field == null) {
                    callback(false, 'You must choose an field')
                } else if (contact === '' || contact == null) {
                    callback(false, 'contact info must be supplied')
                } else if (startDate === '' || startDate == null) {
                    callback(false, 'start date must be supplied')
                } else if (endDate === '' || endDate == null) {
                    callback(false, 'end date must be supplied')
                } else {
                    const info = { title, body, field, contact, startDate, endDate, postedBy: user.id}
        
                    container.studentAdvertRepository.create(info).then(result => {
                        callback(true, result.id)
                    }).catch(error => {
                        console.log(error)
                        callback(false, 'db error')
                    })
                }
            } else {
                callback(false, "You don't have acces to this feature")
            }
        },
        createRecruiterAdvert: function(user, title, body, field, city, website, contact, positions, deadlineDate, callback) {
            if (user.user_type === 2) {
                if (title === '' || title == null) {
                    callback(false, 'title must be supplied')
                } else if (body === '' || body == null) {
                    callback(false, 'body must be supplied')
                } else if (field === 'Choose an option' || field == null) {
                    callback(false, 'You must choose an field')
                } else if (city === '' || city == null) {
                    callback(false, 'city must be supplied')
                } else if (contact === '' || contact == null) {
                    callback(false, 'contact info must be supplied')
                } else if (website === '' || website == null) {
                    callback(false, 'website must be supplied')
                } else if (positions === '' || positions == null) {
                    callback(false, 'positions must be supplied')
                } else if (deadlineDate === '' || deadlineDate == null) {
                    callback(false, 'date must be supplied')
                } else {
                    const info = { title, body, field, website, contact, positions, deadlineDate, postedBy: user.id, city}
        
                    container.recruiterAdvertRepository.create(info).then(result => {
                        callback(true, result.id)
                    }).catch(error => {
                        //console.log(error)
                        callback(false, 'db error')
                    })
                }
            } else {
                callback(false, "You don't have acces to this feature")
            }
        },
        getALlStudentAdverts: function(callback) {
            container.studentAdvertRepository.getAll().then(adverts => {
                callback(true, adverts)
            }).catch(error => {
                console.log(error)
                callback(false, 'error')
            })
        },
        getALlRecruiterAdverts: function(callback) {
            container.recruiterAdvertRepository.getAll().then(adverts => {
                callback(true, adverts)
            }).catch(error => {
                console.log(error)
                callback(false, 'error')
            })
        },
        getAllAdvertsByUser: function(id, user_type, callback) {
            if (user_type === 1) {
                container.studentAdvertRepository.getAllByUser(id).then(adverts => {
                    console.log(adverts)
                    callback(true, adverts)
                }).catch(error => {
                    console.log(error)
                    callback(false, 'error')
                })
            } else if (user_type === 2) {
                container.recruiterAdvertRepository.getAllByUser(id).then(adverts => {
                    console.log(adverts)
                    callback(true, adverts)
                }).catch(error => {
                    console.log(error)
                    callback(false, 'error')
                })
            } else {
                callback(false, 'You don\'t have access to this feature')
            }
        },
        getAdvertById: function(id, advert_type, callback) {
            if (advert_type === 'student') {
                container.studentAdvertRepository.getById(id).then(advert => {
                    callback(true, advert)
                }).catch(error => {
                    console.log(error)
                    callback(false, error)
                })
            } else if (advert_type === 'recruiter') {
                container.recruiterAdvertRepository.getById(id).then(advert => {
                    callback(true, advert)
                }).catch(error => {
                    console.log(error)
                    callback(false, error)
                })
            } else {
                callback(false, 'You must send a advert type (student or recruiter)')
            }
        },
        deleteAdvert: function(advertId, user, callback) {
            if (user.user_type === 1) {
                container.studentAdvertRepository.getById(advertId).then(advert => {
                    if (advert.posted_by === user.id) {
                        container.studentAdvertRepository.delete(advertId).then(result => {
                            callback(true, 'success')
                        }).catch(error => {
                            callback(false, error)
                        })
                    } else {
                        callback(false, 'You don\'t own that advert')
                    }
                }).catch(error => {
                    callback(false, error)
                })
            } else if (user.user_type === 2) {
                container.recruiterAdvertRepository.getById(advertId).then(advert => {
                    if (advert.posted_by === user.id) {
                        container.recruiterAdvertRepository.delete(advertId).then(result => {
                            callback(true, 'success')
                        }).catch(error => {
                            callback(false, error)
                        })
                    } else {
                        callback(false, 'You don\'t own that advert')
                    }
                }).catch(error => {
                    callback(false, error)
                })
            } else {
                callback(false, 'You don\'t have access to this feature')
            }
        },
        updateStudentAdvert: function(user, id, title, body, field, contact, startDate, endDate, callback) {

            if (user.user_type === 1) {
                if (title === '' || title == null) {
                    callback(false, 'title must be supplied')
                } else if (id === '' || id == null) {
                    callback(false, 'id must be supplied')
                } else if (body === '' || body == null) {
                    callback(false, 'body must be supplied')
                } else if (field === 'Choose an option' || field == null) {
                    callback(false, 'You must choose an field')
                } else if (contact === '' || contact == null) {
                    callback(false, 'contact info must be supplied')
                } else if (startDate === '' || startDate == null) {
                    callback(false, 'start date must be supplied')
                } else if (endDate === '' || endDate == null) {
                    callback(false, 'end date must be supplied')
                } else {
                    const info = { title, body, field, contact, startDate, endDate, postedBy: user.id, id}

                    container.studentAdvertRepository.update(info).then(result => {
                        callback(true, result.id)
                    }).catch(error => {
                        console.log(error)
                        callback(false, error)
                    })
                }
            } else {
                callback(false, "You don't have acces to this feature")
            }
        },
        updateRecruiterAdvert: function(user, id, title, body, field, city, website, contact, positions, deadlineDate, callback) {

            if (user.user_type === 2) {
                if (title === '' || title == null) {
                    callback(false, 'title must be supplied')
                } else if (body === '' || body == null) {
                    callback(false, 'body must be supplied')
                } else if (id === '' || id == null) {
                    callback(false, 'id must be supplied')
                } else if (field === 'Choose an option' || field == null) {
                    callback(false, 'You must choose an field')
                } else if (city === '' || city == null) {
                    callback(false, 'city must be supplied')
                } else if (contact === '' || contact == null) {
                    callback(false, 'contact info must be supplied')
                } else if (website === '' || website == null) {
                    callback(false, 'website must be supplied')
                } else if (positions === '' || positions == null) {
                    callback(false, 'positions must be supplied')
                } else if (deadlineDate === '' || deadlineDate == null) {
                    callback(false, 'date must be supplied')
                } else {
                    const info = { title, body, field, website, contact, positions, deadlineDate, postedBy: user.id, id, city}
        
                    container.recruiterAdvertRepository.update(info).then(result => {
                        callback(true, result.id)
                    }).catch(error => {
                        console.log(error)
                        callback(false, 'db error')
                    })
                }
            } else {
                callback(false, "You don't have acces to this feature")
            }
        }
    }
}