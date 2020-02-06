class AccountRepository {
	constructor(dbh) {
		this.dbh = dbh
	}

	create(username, password, email, userType) {
        const sql = `INSERT INTO Accounts (
            username,
            password,
            email,
            user_type,
            created_at)
			VALUES (?, ?, ?, ?, NOW())`

        const values = [username, password, email, userType]

        return this.dbh.run(sql, values)
	}
	
	update(account) {
        const sql = `UPDATE Accounts 
            SET username = ?, password = ?, email = ?, user_type = ?, updated_at = GETDATE()
            WHERE id = ?`

        const values = [
            account.username, 
            account.password, 
            account.email, 
			account.user_type,
			account.id
        ]

        return this.dbh.run(sql, values)
	}

    delete(id) {
        const sql = `DELETE FROM Accounts
            WHERE id = ?`

        return this.dbh.run(sql, [id])
	}
	
    getById(id) {
        const sql = `SELECT * FROM Accounts WHERE id = ?`

        return this.dbh.get(sql, [id])
	}
	
	getByUsername(username) {
		const sql = `SELECT * FROM Accounts WHERE username = ?`

		return this.dbh.get(sql, [username])
	}

    getAll() {
        const sql = `SELECT * FROM Accounts`

        return this.dbh.all(sql)
    }

    count() {
        const sql = 'SELECT COUNT(*) FROM Accounts'

        return this.dbh.all(sql)
    }
}

module.exports = AccountRepository

/*
const db = require('./conn')

exports.getAccountByUsername = function(username, callback) {
	
	const query = `SELECT * FROM Accounts WHERE username = ? LIMIT 1`
	const values = [username]
	
	db.query(query, values, function(error, accounts){
		if (error) {
            console.log(error)
            // check error to send back a application error
			callback('databaseError', null)
		} else {
            console.log(accounts[0])
			callback(null, accounts[0])
		}
	})
}

exports.createAccount = function(account, callback) {
	
	const query = `INSERT INTO Accounts (email, username, password, user_type, created_at) VALUES (?, ?, ?, ?, ?)`
	const values = [account.email, account.username, account.hash, account.level, new Date()]
	
	db.query(query, values, function(error, results) {
		if (error) {
            console.log(error)
			// TODO: Look for usernameUnique violation.
			callback(['databaseError'], null)
		} else {
            console.log(results)
			callback(null, results.insertId)
		}
	})
}*/