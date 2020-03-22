const DatabaseHandler = require('../config/database-handler')

const dbhandler = new DatabaseHandler(
	process.env.DB_HOST,
	process.env.DB_USERNAME,
	process.env.DB_PASSWORD,
	process.env.DB_DATABASE
)

module.exports = dbhandler
global.dbhandler = dbhandler;