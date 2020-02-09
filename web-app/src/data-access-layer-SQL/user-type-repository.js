class UserTypeRepository {
	constructor(dbh) {
		this.dbh = dbh
    }
    
    createTable() {
        const sql = `CREATE TABLE UserTypes (
			id INT AUTO_INCREMENT PRIMARY KEY,
			name VARCHAR(50) UNIQUE NOT NULL,
			description VARCHAR(255))`
        
        return this.dbh.run(sql)
    }

	/**
     * Create a new UserType in the repository
     * @param {Object} userType The 'userType' object
     * @param {String} userType.name The name of the user type
     * @param {String} userType.description The description of the user type
     * @returns {Promise} Promise that represent the 'results'
     */
	create(userType) {
        const sql = `INSERT INTO UserTypes (
			name,
			description) 
			VALUES (?, ?)`

        const values = [
			userType.name, 
			userType.description
		]

        return this.dbh.run(sql, values)
	}
	
	/**
     * Update a specific RecruiterAdvert in the repository
     * @param {Object} userType The 'userType' object
     * @param {Number} userType.id The primary key id
     * @param {String} userType.name The name of the user type
     * @param {String} userType.description The description of the user type
     * @returns {Promise} Promise that represent the 'results'
     */
	update(userType) {
		const sql = `UPDATE UserTypes 
			SET name = ?, description = ? 
			WHERE id = ?`

        const values = [
            userType.name,
			userType.description,
			userType.id
        ]

        return this.dbh.run(sql, values)
	}

    /**
     * Delete a specific UserType in the repository
     * @param {Number} id The primary key id
     * @returns {Promise} Promise that represent the 'results'
     */
    delete(id) {
        const sql = `DELETE FROM UserTypes WHERE id = ?`

        return this.dbh.run(sql, [id])
	}

	/**
     * Get a specific UserType in the repository by the id
     * @param {Number} id The primary key id
     * @returns {Promise} Promise that represent the 'results'
     */
    getById(id) {
        const sql = `SELECT * FROM UserTypes WHERE id = ?`

        return this.dbh.get(sql, [id])
	}

    /**
     * Get all of the UserTypes in the repository
     * @returns {Promise} Promise that represent the 'results'
     */
    getAll() {
        const sql = `SELECT * FROM UserTypes`

        return this.dbh.all(sql)
	}
	
    /**
     * Count all of the UserTypes in the repository
     * @returns {Promise} Promise that represent the 'results'
     */
    count() {
        const sql = 'SELECT COUNT(*) FROM UserTypes'

        return this.dbh.all(sql)
    }
}

module.exports = UserTypeRepository