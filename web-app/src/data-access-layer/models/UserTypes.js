const Sequelize = require("sequelize")

module.exports = sequelize.define("UserTypes", {
    id: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING(50),
        allowNull: false,
        unique: true
    },
    description: {
        type: Sequelize.STRING(255),
        allowNull: true,
    }
});