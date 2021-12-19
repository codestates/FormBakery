'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('formGrids', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      col: {
        type: Sequelize.INTEGER
      },
      row: {
        type: Sequelize.INTEGER
      },
      formContentId: {
        type: Sequelize.INTEGER,
        onDelete: "CASCADE",
        references: { model: "formContents", key: "id", }
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
    await queryInterface.dropTable('formGrids');
  }
};