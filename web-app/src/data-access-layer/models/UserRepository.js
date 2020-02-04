const Sequelize = require("sequelize")

module.exports = sequelize.define("User", {
    username: {
        type: Sequelize.STRING(20),
        unique: true,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING(100),
        unique: true,
        allowNull: false
    },
    user_type: {
        type: Sequelize.INTEGER,
        allowNull: false,
        foreignKey: true,
        references: {
          model: "user-types",
          key: "id"
        }
    }
});