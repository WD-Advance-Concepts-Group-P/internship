const RecruiterAdvert = require('../models/RecruiterAdverts')

class RecruiterAdvertRepository {
    
    /**
     * Create a new RecruiterAdvert in the repository
     * @param {Object} advert The 'advert' object
     * @param {String} advert.title The title of the advert
     * @param {String} advert.body The body of the advert
     * @param {String} advert.field The field of the advert
     * @param {Number} advert.address The address to the recruiter
     * @param {String} advert.website The website to the recruiter
     * @param {String} advert.contact The contact information to the recruiter
     * @param {Number} advert.positions Amount of positions
     * @param {Date} advert.deadlineDate The deadline date of the advert
     * @param {Number} advert.postedBy The id of the Account that posted the advert
     * @returns {Promise} Promise that represent the 'results'
     */
    create(advert) {
        return new Promise((resolve, reject) => {
            RecruiterAdvert.create({
                title: advert.values.title,
                body: advert.values.body,
                field: advert.values.field,
                city: advert.values.city,
                website: advert.values.website,
                contact: advert.values.contact,
                positions: advert.values.positions,
                deadline_date: advert.values.deadline_date,
                posted_by: advert.postedBy
            }).then(advert => {
                resolve({ id: advert.dataValues.id })
            }).catch(error => {
                reject(error)
            })
        })
    }

    /**
     * Update a specific RecruiterAdvert in the repository
     * @param {Object} advert The 'advert' object
     * @param {Number} advert.id The primary key id
     * @param {String} advert.title The title of the advert
     * @param {String} advert.body The body of the advert
     * @param {String} advert.field The field of the advert
     * @param {Number} advert.address The address to the recruiter
     * @param {String} advert.website The website to the recruiter
     * @param {String} advert.contact The contact information to the recruiter
     * @param {Number} advert.positions Amount of positions
     * @param {Date} advert.deadlineDate The deadline date of the advert
     * @param {Number} advert.postedBy The id of the Account that posted the advert
     * @returns {Promise} Promise that represent the 'results'
     */
    update(advert) {
        return new Promise((resolve, reject) => {
            RecruiterAdvert.update({
                title: advert.values.title,
                body: advert.values.body,
                field: advert.values.field,
                city: advert.values.city,
                website: advert.values.website,
                contact: advert.values.contact,
                positions: advert.values.positions,
                deadline_date: advert.values.deadline_date
            }, { where: {
                id: advert.id,
                posted_by: advert.postedBy
            }
            }).then(advertInfo => {
                resolve({ id: advertInfo.id })
            }).catch(error => {
                reject(error)
            })
        })
    }

    /**
     * Delete a specific RecruiterAdvert in the repository
     * @param {Number} id The primary key id
     * @returns {Promise} Promise that represent the 'results'
     */
    delete(id) {
        return new Promise((resolve, reject) => {
            RecruiterAdvert.destroy({
                where: { id: id }
            }).then(() => {
                resolve()
            }).catch(error => {
                reject(error)
            })
        })
    }

    /**
     * Get a specific RecruiterAdvert in the repository by the id
     * @param {Number} id The primary key id
     * @returns {Promise} Promise that represent the 'results'
     */
    getById(id) {
        return new Promise((resolve, reject) => {
            RecruiterAdvert.findOne({
                raw: true,
                where: { id: id }
            }).then(adverts => {
                resolve(adverts)
            }).catch(error => {
                reject(error)
            })
        })
    }

    getAllByUser(id) {
        return new Promise((resolve, reject) => {
            RecruiterAdvert.findAll({
                raw: true,
                order: [['created_at', 'DESC']],
                where: { posted_by: id }
            }).then(adverts => {
                resolve(adverts)
            }).catch(error => {
                reject(error)
            })
        })
    }
     
    /**
     * Get all of the RecruiterAdverts in the repository
     * @returns {Promise} Promise that represent the 'results'
     */
    getAll() {
        return new Promise((resolve, reject) => {
            RecruiterAdvert.findAll({ raw: true, order: [['created_at', 'DESC']] }).then(adverts => {
                resolve(adverts)
            }).catch(error => {
                reject(error)
            })
        })
    }

}

module.exports = RecruiterAdvertRepository