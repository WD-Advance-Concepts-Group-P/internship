module.exports = function(container) {
    return {
        createStudentAdvert: function(user, title, body, field, contact, startDate, endDate, callback) {

            if (user.user_type === 1) {
                if (title === '') {
                    callback(false, 'title must be supplied')
                } else if (body === '') {
                    callback(false, 'body must be supplied')
                } else if (field === '') {
                    callback(false, 'field must be supplied')
                } else if (contact === '') {
                    callback(false, 'contact info must be supplied')
                } else if (startDate === '') {
                    callback(false, 'start date must be supplied')
                } else if (endDate === '') {
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
        createRecruiterAdvert: function(user, title, body, field, website, contact, positions, deadlineDate, callback) {

            if (user.user_type === 2) {
                if (title === '') {
                    callback(false, 'title must be supplied')
                } else if (body === '') {
                    callback(false, 'body must be supplied')
                } else if (field === '') {
                    callback(false, 'field must be supplied')
                } else if (contact === '') {
                    callback(false, 'contact info must be supplied')
                } else if (website === '') {
                    callback(false, 'website must be supplied')
                } else if (positions === '') {
                    callback(false, 'positions must be supplied')
                } else if (deadlineDate === '') {
                    callback(false, 'date must be supplied')
                } else {
                    const info = { title, body, field, website, contact, positions, deadlineDate, postedBy: user.id, address: 1}
        
                    container.recruiterAdvertRepository.create(info).then(result => {
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
        getALlStudentAdverts: function(callback) {
            container.studentAdvertRepository.getAll().then(adverts => {
                console.log(adverts)
                callback(true, adverts)
            }).catch(error => {
                console.log(error)
                callback(false, 'error')
            })
        },
        getALlRecruiterAdverts: function(callback) {
            container.recruiterAdvertRepository.getAll().then(adverts => {
                console.log(adverts)
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
                    console.log(advert)
                    callback(true, advert)
                }).catch(error => {
                    console.log(error)
                    callback(false, 'error')
                })
            } else if (advert_type === 'recruiter') {
                container.recruiterAdvertRepository.getById(id).then(advert => {
                    console.log(advert)
                    callback(true, advert)
                }).catch(error => {
                    console.log(error)
                    callback(false, 'error')
                })
            } else {
                callback(false, 'Does not exsist')
            }
        },
        deleteAdvert: function(advertId, user, callback) {
            if (user.user_type === 1) {
                container.studentAdvertRepository.getById(advertId).then(advert => {
                    if (advert.posted_by === user.id) {
                        container.studentAdvertRepository.delete(advertId).then(result => {
                            callback(true, 'success')
                        }).catch(error => {
                            callback(false, 'You don\'t own that advert')
                        })
                    }
                }).catch(error => {
                    callback(false, 'error')
                })
            } else if (user.user_type === 2) {
                container.recruiterAdvertRepository.getById(advertId).then(advert => {
                    if (advert.posted_by === user.id) {
                        container.recruiterAdvertRepository.delete(advertId).then(result => {
                            callback(true, 'success')
                        }).catch(error => {
                            callback(false, 'You don\'t own that advert')
                        })
                    }
                }).catch(error => {
                    callback(false, 'error')
                })
            } else {
                callback(false, 'You don\'t have access to this feature')
            }
        },
        updateStudentAdvert: function(user, title, body, field, contact, startDate, endDate, callback) {

            if (user.user_type === 1) {
                if (title === '') {
                    callback(false, 'title must be supplied')
                } else if (body === '') {
                    callback(false, 'body must be supplied')
                } else if (field === '') {
                    callback(false, 'field must be supplied')
                } else if (contact === '') {
                    callback(false, 'contact info must be supplied')
                } else if (startDate === '') {
                    callback(false, 'start date must be supplied')
                } else if (endDate === '') {
                    callback(false, 'end date must be supplied')
                } else {
                    const info = { title, body, field, contact, startDate, endDate, postedBy: user.id}

                    container.studentAdvertRepository.update(info).then(result => {
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
        updateRecruiterAdvert: function(user, title, body, field, website, contact, positions, deadlineDate, callback) {

            if (user.user_type === 2) {
                if (title === '') {
                    callback(false, 'title must be supplied')
                } else if (body === '') {
                    callback(false, 'body must be supplied')
                } else if (field === '') {
                    callback(false, 'field must be supplied')
                } else if (contact === '') {
                    callback(false, 'contact info must be supplied')
                } else if (website === '') {
                    callback(false, 'website must be supplied')
                } else if (positions === '') {
                    callback(false, 'positions must be supplied')
                } else if (deadlineDate === '') {
                    callback(false, 'date must be supplied')
                } else {
                    const info = { title, body, field, website, contact, positions, deadlineDate, id: user.id, address: 1}
        
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