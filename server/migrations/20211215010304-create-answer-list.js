'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('answerLists', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      formContentId: {
        type: Sequelize.INTEGER
      },
      answer: {
        type: Sequelize.STRING
      },
      answerId: {
        type: Sequelize.INTEGER
      },
      formOptionId: {
        type: Sequelize.INTEGER
      },
      formGridId:{
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('answerLists');
  }
};