const Sequelize = require("sequelize");

const sequelize = new Sequelize(process.env.DB_DATABASE, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST_POSTGRES,
    dialect: 'postgres',
    define: {
        underscored: true
    }
});

module.exports = sequelize;
global.sequelize = sequelize;