'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("employees", { 
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      user_id: {
        type: Sequelize.INTEGER,
        unique: true,
        allowNull: false,
        foreignKey: true,
        references: {
          model: "companies",
          key: "id"
        }
      },
      created_at: Sequelize.DATE,
      updated_at: Sequelize.DATE
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("employees")
  }
};
