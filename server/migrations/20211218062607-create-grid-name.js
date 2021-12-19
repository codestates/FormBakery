'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('gridNames', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      location: {
        type: Sequelize.INTEGER,
        allowNull:false
      },
      text: {
        type: Sequelize.STRING
      },
      formGridId: {
        type: Sequelize.INTEGER,
        allowNull:false,
        onDelete: "CASCADE",
        references: { model: "formGrids", key: "id", }
      },
      isRaw: {
        type: Sequelize.STRING,
        allowNull:false
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
    await queryInterface.dropTable('gridNames');
  }
};