const Sequelize = require("sequelize")

module.exports = sequelize.define("Job_Post", {

    id: {
        type: Sequelize.INTEGER[11],
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    username: {
        type: Sequelize.STRING(35),
        allowNull: false,
        unique: true
    },
    password: {
        type: Sequelize.STRING(20),
        allowNull: false
    },
    email: {
        type: Sequelize.STRING(50),
        allowNull: false,
        unique: true
    }
});