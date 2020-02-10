class RecruiterAdvertRepository {
    constructor(dbh) {
        this.dbh = dbh
    }

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
        const sql = `INSERT INTO RecruiterAdverts (
            title,
            body,
            field,
            address,
            website,
            contact,
            positions,
            deadline_date,
            posted_by,
            created_at)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())`

        const values = [
            advert.title, 
            advert.body, 
            advert.field, 
            advert.address, 
            advert.website, 
            advert.contact, 
            advert.positions, 
            advert.deadlineDate, 
            advert.postedBy
        ]

        return this.dbh.run(sql, values)
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
        const sql = `UPDATE RecruiterAdverts 
            SET title = ?, body = ?, field = ?, contact = ?, start_date = ?, end_date = ?, updated_at = NOW()
            WHERE id = ?`

        const values = [
            advert.title, 
            advert.body, 
            advert.field, 
            advert.address, 
            advert.website, 
            advert.contact, 
            advert.positions, 
            advert.deadlineDate, 
            advert.postedBy,
            advert.id
        ]

        return this.dbh.run(sql, values)
    }

    /**
     * Delete a specific RecruiterAdvert in the repository
     * @param {Number} id The primary key id
     * @returns {Promise} Promise that represent the 'results'
     */
    delete(id) {
        const sql = `DELETE FROM RecruiterAdverts
            WHERE id = ?`

        return this.dbh.run(sql, [id])
    }

    /**
     * Get a specific RecruiterAdvert in the repository by the id
     * @param {Number} id The primary key id
     * @returns {Promise} Promise that represent the 'results'
     */
    getById(id) {
        const sql = `SELECT * FROM RecruiterAdverts WHERE id = ?`

        return this.dbh.get(sql, [id])
    }
     
    /**
     * Get all of the RecruiterAdverts in the repository
     * @returns {Promise} Promise that represent the 'results'
     */
    getAll() {
        const sql = `SELECT * FROM RecruiterAdverts`

        return this.dbh.all(sql)
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