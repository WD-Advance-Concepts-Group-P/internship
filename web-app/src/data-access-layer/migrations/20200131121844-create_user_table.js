'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('users', { 
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE
    })
  },

  down: (queryInterface, Sequelize) => {

    return queryInterface.dropTable("users");


    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
};

/*

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
}*/