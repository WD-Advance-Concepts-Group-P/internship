class ChatRepository {
	constructor(dbh) {
		this.dbh = dbh
	}

	createTable() {
        const sql = `CREATE TABLE Chat (
			id INT AUTO_INCREMENT PRIMARY KEY,
			sender_id INT NOT NULL,
			receiver_id INT NOT NULL,
			content TEXT NOT NULL,
			created_at DATE NOT NULL)`
        
        return this.dbh.run(sql)
    }

	/**
     * Create a new chat in the repository
     * @param {Object} chat The 'chat' object
     * @param {Number} chat.senderId The id of the sender
     * @param {Number} chat.receiverId The id of the receiver
     * @param {String} chat.content The content of the message
     * @returns {Promise} Promise that represent the 'results'
     */
	create(chat) {
        const sql = `INSERT INTO Chat (
			sender_id,
			receiver_id,
			content
			created_at) 
			VALUES (?, ?, ?, NOW())`

        const values = [
			chat.senderId, 
			chat.receiverId, 
			chat.content
		]

        return this.dbh.run(sql, values)
	}

	/**
     * Update a specific chat in the repository
     * @param {Object} chat The 'chat' object
     * @param {Number} chat.id The primary key id
     * @param {Number} chat.senderId The id of the sender
     * @param {Number} chat.receiverId The id of the receiver
     * @param {String} chat.content The content of the message
     * @returns {Promise} Promise that represent the 'results'
     */
	update(chat) {
		const sql = `UPDATE Chat 
			SET sender_id = ?, receiver_id = ?, content = ? 
			WHERE id = ?`

        const values = [
			chat.senderId,
			chat.receiverId,
			chat.content,
			chat.id
        ]

        return this.dbh.run(sql, values)
	}

	/**
     * Delete a specific chat in the repository
     * @param {Number} id The primary key id
     * @returns {Promise} Promise that represent the 'results'
     */
    delete(id) {
        const sql = `DELETE FROM Chat WHERE id = ?`

        return this.dbh.run(sql, [id])
	}
	    
    /**
     * Get a specific chat in the repository by the id
     * @param {Number} id The primary key id
     * @returns {Promise} Promise that represent the 'results'
     */
    getById(id) {
        const sql = `SELECT * FROM Chat WHERE id = ?`

        return this.dbh.get(sql, [id])
	}

    /**
     * Get a specific chat in the repository by the sender's id
     * @param {Number} id The primary key id
     * @returns {Promise} Promise that represent the 'results'
     */
	getAllBySenderId(receiverId) {
		const sql = "SELECT * FROM Chat WHERE sender_id = ?"

		return this.dbh.all(sql)
	}

	/**
     * Get a specific chat in the repository by the receiver's id
     * @param {Number} id The primary key id
     * @returns {Promise} Promise that represent the 'results'
     */
	getAllByReceiverId(receiverId) {
		const sql = "SELECT * FROM Chat WHERE receiver_id = ?"

		return this.dbh.all(sql)
	}	

	/**
     * Get all of the chats in the repository
     * @returns {Promise} Promise that represent the 'results'
     */
    getAll() {
        const sql = `SELECT * FROM Chat`

        return this.dbh.all(sql)
    }

	/**
     * Count all of the chats in the repository
     * @returns {Promise} Promise that represent the 'results'
     */
    count() {
        const sql = 'SELECT COUNT(*) FROM Chat'

        return this.dbh.all(sql)
    }
}

module.exports = ChatRepository