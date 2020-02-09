class AccountRepository {
	constructor(dbh) {
		this.dbh = dbh
	}

    /**
     * Create a new account in the repository
     * @param {Object} account The 'account' object
     * @param {String} account.username The unique username
     * @param {String} account.password The hashed password
     * @param {String} account.email The unique email
     * @param {Number} account.userType The user type
     * @returns {Promise} Promise that represent the 'results'
     */
	create(account) {
        const sql = `INSERT INTO Accounts (
            username,
            password,
            email,
            user_type,
            created_at)
			VALUES (?, ?, ?, ?, NOW())`

        const values = [
            account.username, 
            account.password, 
            account.email, 
            account.userType
        ]

        return this.dbh.run(sql, values)
	}
    
    /**
     * Update a specific account in the repository
     * @param {Object} account The 'account' object
     * @param {Number} account.id The primary key id
     * @param {String} account.username The unique username
     * @param {String} account.password The hashed password
     * @param {String} account.email The unique email
     * @param {Number} account.userType The user type
     * @returns {Promise} Promise that represent the 'results'
     */
	update(account) {
        const sql = `UPDATE Accounts 
            SET username = ?, password = ?, email = ?, user_type = ?, updated_at = NOW()
            WHERE id = ?`

        const values = [
            account.username, 
            account.password, 
            account.email, 
			account.userType,
			account.id
        ]

        return this.dbh.run(sql, values)
	}

    /**
     * Delete a specific account in the repository
     * @param {Number} id The primary key id
     * @returns {Promise} Promise that represent the 'results'
     */
    delete(id) {
        const sql = `DELETE FROM Accounts
            WHERE id = ?`

        return this.dbh.run(sql, [id])
	}
    
    /**
     * Get a specific account in the repository by the id
     * @param {Number} id The primary key id
     * @returns {Promise} Promise that represent the 'results'
     */
    getById(id) {
        const sql = `SELECT * FROM Accounts WHERE id = ?`

        return this.dbh.get(sql, [id])
	}
    
    /**
     * Get a specific account in the repository by the username
     * @param {Number} id The primary key id
     * @returns {Promise} Promise that represent the 'results'
     */
	getByUsername(username) {
		const sql = `SELECT * FROM Accounts WHERE username = ?`

		return this.dbh.get(sql, [username])
	}
     
    /**
     * Get all of the accounts in the repository
     * @returns {Promise} Promise that represent the 'results'
     */
    getAll() {
        const sql = `SELECT * FROM Accounts`

        return this.dbh.all(sql)
    }

    /**
     * Count all of the accounts in the repository
     * @returns {Promise} Promise that represent the 'results'
     */
    count() {
        const sql = 'SELECT COUNT(*) FROM Accounts'

        return this.dbh.all(sql)
    }
}

module.exports = AccountRepository