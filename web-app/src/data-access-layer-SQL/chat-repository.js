const db = require('./db')

exports.getMessagesById = function(id, callback) {
	
	const query = `SELECT * FROM Chat WHERE reciver_id = ?`
	const values = [id]
	
	db.query(query, values, function(error, messages){
		if (error) {
            console.log(error)
            // check error to send back a application error
			callback('databaseError', null)
		} else {
            console.log(messages)
			callback(null, messages)
		}
	})
}

exports.deleteMessageById = function(id, callback) {
	
	const query = `DELETE FROM Chat WHERE id = ?`
	const values = [id]
	
	db.query(query, values, function(error, info){
		if (error) {
            console.log(error)
            // check error to send back a application error
			callback('databaseError', null)
		} else {
            console.log(info)
			callback(null, null)
		}
	})
}


exports.sendMessage = function(sendId, reciverId, message, callback) {
	
	const query = `INSERT INTO Chat (sender_id, reciver_id, content, created_at) VALUES (?, ?, ?, date('now'))`
	const values = [sendId, reciverId, message]
	
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