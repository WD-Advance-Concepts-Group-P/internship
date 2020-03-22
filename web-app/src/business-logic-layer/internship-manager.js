const Fuse = require('fuse.js')

let container = null

const USER_TYPE_STUDENT = 1
const USER_TYPE_RECRUITER = 2

/**
 * 
 * @param {*} values 
 * @param {*} user 
 */
function createAdvert(values, user) {
    return new Promise((resolve, reject) => {

        const advert = { values, postedBy: user.id}

        switch(user.user_type) {
            case USER_TYPE_STUDENT:
                container.studentAdvertRepository.create(advert)
                    .then(result => { resolve(result.id) })
                    .catch(error => { reject(error) })
                break
            case USER_TYPE_RECRUITER:
                container.recruiterAdvertRepository.create(advert)
                    .then(result => resolve(result.id) )
                    .catch(error => reject(error) )
                break
        }
    })
}

/**
 * 
 * @param {*} user_type 
 */
function getAllAdverts(user_type) {
    return new Promise((resolve, reject) => {
        switch(user_type) {
            case USER_TYPE_STUDENT:
                container.studentAdvertRepository.getAll()
                    .then(result => resolve(result))
                    .catch(error => reject(error))
                break
            case USER_TYPE_RECRUITER:
                container.recruiterAdvertRepository.getAll()
                    .then(result => resolve(result))
                    .catch(error => reject(error))
                break
        }
    })
}

/**
 * 
 * @param {*} id 
 * @param {*} user_type 
 */
function getAllAdvertsByUser(user) {
    return new Promise((resolve, reject) => {
        switch(user.user_type) {
            case USER_TYPE_STUDENT:
                container.studentAdvertRepository.getAllByUser(user.id)
                    .then(result => resolve(result))
                    .catch(error => reject(error))
                break
            case USER_TYPE_RECRUITER:
                container.recruiterAdvertRepository.getAllByUser(user.id)
                    .then(result => resolve(result))
                    .catch(error => reject(error))
                break
        }
    })
}

/**
 * 
 * @param {*} type 
 * @param {*} searchText 
 */
function searchAdverts(type, searchText) {
    return new Promise((resolve, reject) => {

        var options = {
            shouldSort: true,
            threshold: 0.5,
            location: 0,
            distance: 100,
            maxPatternLength: 32,
            minMatchCharLength: 3,
            keys: [
            "title",
            "body", 
            "field",
            "contact"]
        }

        switch (type) {
            case 'Student':
                container.studentAdvertRepository.getAll()
                    .then(result => {
                        const fuse = new Fuse(result, options)
                        searchResult = fuse.search(searchText)
                        resolve(searchResult)
                    })
                    .catch(error => reject(error))

                break
            case 'Recruiter':
                container.recruiterAdvertRepository.getAll()
                    .then(result => {
                        const fuse = new Fuse(result, options)
                        searchResult = fuse.search(searchText)
                        resolve(searchResult)
                    })
                    .catch(error => reject(error))

                break
        }
    })
}

/**
 * 
 * @param {*} id 
 * @param {*} advert_type 
 */
function getAdvertById(id, advert_type) {
    return new Promise((resolve, reject) => {
        switch(advert_type) {
            case 'student':
                container.studentAdvertRepository.getById(id)
                    .then(result => resolve(result))
                    .catch(error => reject(error))
                break
            case 'recruiter':
                container.recruiterAdvertRepository.getById(id)
                    .then(result => resolve(result))
                    .catch(error => reject(error))
                break
        }
    })
}

/**
 * 
 * @param {*} id 
 * @param {*} user 
 */
function deleteAdvert(id, user) {
    return new Promise((resolve, reject) => {
        switch(user.user_type) {
            case USER_TYPE_STUDENT:
                container.studentAdvertRepository.getById(id)
                    .then(advert => {
                        console.log(advert)
                        if (advert.posted_by === user.id)
                            return container.studentAdvertRepository.delete(id)
                    })
                    .then(() => resolve())
                    .catch(error => reject(error))

                break
            case USER_TYPE_RECRUITER:
                container.recruiterAdvertRepository.getById(id)
                    .then(advert => {
                        if (advert.posted_by === user.id)
                            return container.recruiterAdvertRepository.delete(id)
                    })
                    .then(() => resolve())
                    .catch(error => reject(error))

                break
        }
    })
}

/**
 * 
 * @param {*} user 
 * @param {*} values 
 * @param {*} id 
 */
function updateAdvert(user, values, id) {
    return new Promise((resolve, reject) => {

        const advert = { values, postedBy: user.id, id }

        switch (user.user_type) {
            case USER_TYPE_STUDENT: 
                container.studentAdvertRepository.update(advert)
                    .then(result => resolve(result.id))
                    .catch(error => reject(error))
                break
            case USER_TYPE_RECRUITER: 
                container.recruiterAdvertRepository.update(advert)
                    .then(result => resolve(result.id))
                    .catch(error => reject(error))
                break
        }

    })
}

module.exports = function(_container) {
    container = _container
    return {
        createAdvert,
        getAllAdverts,
        getAllAdvertsByUser,
        searchAdverts,
        getAdvertById,
        deleteAdvert,
        updateAdvert
    }
}