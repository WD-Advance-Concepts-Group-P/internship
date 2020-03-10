class StudentAdvertRepository {
    constructor(dbh) {
        this.dbh = global.dbhandler
    }

    createTable() {
        const sql = `CREATE TABLE StudentAdverts (
            id INT AUTO_INCREMENT PRIMARY KEY,
            title TEXT NOT NULL,
            body TEXT NOT NULL,
            field VARCHAR(120) NOT NULL,
            contact VARCHAR(120) NOT NULL,
            start_date DATE NOT NULL,
            end_date DATE NOT NULL,
            posted_by INT NOT NULL,
            created_at DATE NOT NULL,
            updated_at DATE,
            FOREIGN KEY (posted_by) REFERENCES Accounts(id))`
        
        return this.dbh.run(sql)
    }
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
        const sql = `INSERT INTO StudentAdverts (
            title,
            body,
            field,
            contact,
            start_date,
            end_date,
            posted_by,
            created_at)
            VALUES (?, ?, ?, ?, ?, ?, ?, NOW())`

        const values = [
            advert.values.title, 
            advert.values.body, 
            advert.values.field, 
            advert.values.contact, 
            advert.values.start_date, 
            advert.values.end_date, 
            advert.postedBy
        ]

        return this.dbh.run(sql, values)
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
        const sql = `UPDATE StudentAdverts 
            SET title = ?, body = ?, field = ?, contact = ?, start_date = ?, end_date = ?, updated_at = NOW()
            WHERE id = ?`

        const values = [
            advert.values.title, 
            advert.values.body, 
            advert.values.field, 
            advert.values.contact,
            advert.values.start_date, 
            advert.values.end_date, 
            advert.id
        ]

        return this.dbh.run(sql, values)
    }

    /**
     * Delete a specific StudentAdvert in the repository
     * @param {Number} id The primary key id
     * @returns {Promise} Promise that represent the 'results'
     */
    delete(id) {
        const sql = `DELETE FROM StudentAdverts
            WHERE id = ?`

        return this.dbh.run(sql, [id])
    }

    /**
     * Get a specific StudentAdvert in the repository by the id
     * @param {Number} id The primary key id
     * @returns {Promise} Promise that represent the 'results'
     */
    getById(id) {
        const sql = `SELECT * FROM StudentAdverts WHERE id = ?`

        return this.dbh.get(sql, [id])
    }

    getAllByUser(id) {
        const sql = `SELECT * FROM StudentAdverts WHERE posted_by = ? ORDER BY created_at DESC`

        return this.dbh.all(sql, [id])
    }
     
    /**
     * Get all of the StudentAdverts in the repository
     * @returns {Promise} Promise that represent the 'results'
     */
    getAll() {
        const sql = `SELECT * FROM StudentAdverts ORDER BY created_at DESC`

        return this.dbh.all(sql)
    }

    /**
     * Count all of the StudentAdverts in the repository
     * @returns {Promise} Promise that represent the 'results'
     */
    count() {
        const sql = 'SELECT COUNT(*) FROM StudentAdverts'

        return this.dbh.all(sql)
    }
}

module.exports = StudentAdvertRepository