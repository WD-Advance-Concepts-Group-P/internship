const StudentAdverts = require('../models/StudentAdverts')

class StudentAdvertRepository {
    
    /**
     * Create a new StudentAdvert in the repository
     * @param {Object} advert The 'advert' object
     * @param {String} advert.title The title of the advert
     * @param {String} advert.body The body of the advert
     * @param {String} advert.field The field of the advert
     * @param {Number} advert.contact The contact information to the student
     * @param {String} advert.startDate The start date of position
     * @param {String} advert.endDate The end date of position
     * @param {Number} advert.postedBy The id of the Account that posted the advert
     * @returns {Promise} Promise that represent the 'results'
     */
    create(advert) {
        return new Promise((resolve, reject) => {
            StudentAdverts.create({
                title: advert.values.title,
                body: advert.values.body,
                field: advert.values.field,
                contact: advert.values.contact,
                start_date: advert.values.start_date,
                end_date: advert.values.end_date,
                posted_by: advert.postedBy
            }).then(advert => {
                resolve({ id: advert.dataValues.id })
            }).catch(error => {
                reject(error)
            })
        })
    }

    /**
     * Create a new StudentAdvert in the repository
     * @param {Object} advert The 'advert' object
     * @param {Number} advert.id The primary key id
     * @param {String} advert.title The title of the advert
     * @param {String} advert.body The body of the advert
     * @param {String} advert.field The field of the advert
     * @param {Number} advert.contact The contact information to the student
     * @param {String} advert.startDate The start date of position
     * @param {String} advert.endDate The end date of position
     * @param {Number} advert.postedBy The id of the Account that posted the advert
     * @returns {Promise} Promise that represent the 'results'
     */
    update(advert) {
        return new Promise((resolve, reject) => {
            StudentAdverts.update({
                title: advert.values.title,
                body: advert.values.body,
                field: advert.values.field,
                contact: advert.values.contact,
                start_date: advert.values.start_date,
                end_date: advert.values.end_date
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
     * Delete a specific StudentAdvert in the repository
     * @param {Number} id The primary key id
     * @returns {Promise} Promise that represent the 'results'
     */
    delete(id) {
        return new Promise((resolve, reject) => {
            StudentAdverts.destroy({
                where: { id: id }
            }).then(() => {
                resolve()
            }).catch(error => {
                reject(error)
            })
        })
    }

    /**
     * Get a specific StudentAdvert in the repository by the id
     * @param {Number} id The primary key id
     * @returns {Promise} Promise that represent the 'results'
     */
    getById(id) {
        return new Promise((resolve, reject) => {
            StudentAdverts.findOne({ raw: true, where: { id: id }}).then(adverts => {
                resolve(adverts)
            }).catch(error => {
                reject(error)
            })
        })
    }

    getAllByUser(id) {
        return new Promise((resolve, reject) => {
            StudentAdverts.findAll({
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
     * Get all of the StudentAdverts in the repository
     * @returns {Promise} Promise that represent the 'results'
     */
    getAll() {
        return new Promise((resolve, reject) => {
            StudentAdverts.findAll({ raw: true, order: [['created_at', 'DESC']] }).then(adverts => {
                resolve(adverts)
            }).catch(error => {
                reject(error)
            })
        })
    }
}

module.exports = StudentAdvertRepository