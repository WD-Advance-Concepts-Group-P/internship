const Chat = require('../models/Chat')
require('../connection') 
const Sequelize = require("sequelize")
const Accounts = require('./account-repository')

class ChatRepository {

	/**
     * Create a new chat in the repository
     * @param {Object} chat The 'chat' object
     * @param {Number} chat.senderId The id of the sender
     * @param {Number} chat.receiverId The id of the receiver
     * @param {String} chat.content The content of the message
     * @returns {Promise} Promise that represent the 'results'
     */
	create(chat) {
        return new Promise((resolve, reject) => {
            Chat.create({
                sender_id: chat.senderId,
                receiver_id: chat.receiverId,
                content: chat.content
            }).then(chat => {
                resolve({ id: chat.id })
            }).catch(error => {
                reject(error)
            })
        })
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
	getAllBySenderId(senderId) {
		const sql = "SELECT * FROM Chat WHERE sender_id = ?"

		return this.dbh.all(sql, [senderId])
	}

	/**
     * Get a specific chat in the repository by the receiver's id
     * @param {Number} id The primary key id
     * @returns {Promise} Promise that represent the 'results'
     */
	getAllByReceiverId(receiverId) {
		const sql = "SELECT * FROM Chat WHERE receiver_id = ?"

		return this.dbh.all(sql, [receiverId])
	}	

	/**
     * Get all of the chats in the repository
     * @returns {Promise} Promise that represent the 'results'
     */
    getAll() {
        const sql = `SELECT * FROM Chat`

        return this.dbh.all(sql)
    }

    getAllMyChats(id) {
        return new Promise((resolve, reject) => {
            sequelize.query(
                `SELECT sender_id, username FROM chats
                INNER JOIN accounts ON sender_id = accounts.id
                WHERE receiver_id = :receiver_id GROUP BY sender_id, username`,
                {
                    replacements: { receiver_id: id },
                    model: Chat,
                    type: Sequelize.QueryTypes.SELECT,
                    group: ['username'],
                    raw: true
                }
            ).then(chats => {
                resolve(chats)
            }).catch(error => {
                console.log(error)
                reject(error)
            })
        })
  

        //const sql = `SELECT sender_id, username FROM Chat INNER JOIN Accounts ON Chat.sender_id = Accounts.id WHERE receiver_id = ? GROUP BY username`
    }

    getAllMessagesByChat(receiverId, senderId) {
        return new Promise((resolve, reject) => {
            Chat.findAll({ 
                raw: true,
                where: { 
                    receiver_id: receiverId,
                    sender_id: senderId,
                }, 
            }).then(messages => {
                Chat.findAll({
                    raw: true,
                    where: { 
                        receiver_id: senderId,
                        sender_id: receiverId,
                    }, 
                }).then(myMessages => {
                    resolve([messages, myMessages])
                }).catch(error => {
                    reject(error)
                })
            }).catch(error => {
                reject(error)
            })
        })

        //const sql = `SELECT * FROM Chat WHERE sender_id = ? AND receiver_id = ? ORDER BY id DESC`
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