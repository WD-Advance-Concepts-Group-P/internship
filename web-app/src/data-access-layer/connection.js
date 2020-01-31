const Sequelize = require("sequelize");

const sequelize = new Sequelize('web-app', 'root', 'test123', {
    host: 'db',
    dialect: 'mysql'
});

module.exports = sequelize;
global.sequelize = sequelize;