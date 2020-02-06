const db = require('./db')

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
}