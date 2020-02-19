const RecruiterAdvert = require('../models/RecruiterAdverts')

class RecruiterAdvertRepository {
    createTable() {
        const sql = `CREATE TABLE StudentAdverts (
            id INT AUTO_INCREMENT PRIMARY KEY,
            title TEXT NOT NULL,
            body TEXT NOT NULL,
            field VARCHAR(120) NOT NULL,
            address INT NOT NULL,
            website TEXT NOT NULL,
            contact VARCHAR(120) NOT NULL,
            positions INT NOT NULL,
            deadline_date DATE NOT NULL,
            posted_by INT NOT NULL,
            created_at DATE NOT NULL,
            updated_at DATE,
            FOREIGN KEY (address) REFERENCES Addresses(id))
            FOREIGN KEY (posted_by) REFERENCES Accounts(id))`
        
        return this.dbh.run(sql)
    }
    
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
                title: advert.title,
                body: advert.body,
                field: advert.field,
                city: advert.city,
                website: advert.website,
                contact: advert.contact,
                positions: advert.positions,
                deadline_date: advert.deadlineDate,
                posted_by: advert.postedBy
            }).then(advert => {
                const result = advert.dataValues.id
                console.log(result)
                resolve({ id: result })
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
                title: advert.title,
                body: advert.body,
                field: advert.field,
                city: advert.city,
                website: advert.website,
                contact: advert.contact,
                positions: advert.positions,
                deadline_date: advert.deadlineDate
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
            RecruiterAdvert.find({
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
            RecruiterAdvert.findAll().then(adverts => {
                resolve(adverts)
            }).catch(error => {
                reject(error)
            })
        })
    }

    /**
     * Count all of the RecruiterAdverts in the repository
     * @returns {Promise} Promise that represent the 'results'
     */
    count() {
        const sql = 'SELECT COUNT(*) FROM RecruiterAdverts'

        return this.dbh.all(sql)
    }
}

module.exports = RecruiterAdvertRepository