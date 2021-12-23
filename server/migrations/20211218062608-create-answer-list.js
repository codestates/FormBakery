"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("answerLists", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      formContentId: {
        type: Sequelize.INTEGER,
        onDelete: "CASCADE",
        references: { model: "formContents", key: "id" },
      },
      answer: {
        type: Sequelize.STRING,
      },
      answerId: {
        type: Sequelize.INTEGER,
        onDelete: "CASCADE",
        references: { model: "answers", key: "id" },
      },
      formOptionId: {
        type: Sequelize.INTEGER,
        onDelete: "CASCADE",
        references: { model: "formOptions", key: "id" },
      },
      formGridId: {
        type: Sequelize.INTEGER,
        onDelete: "CASCADE",
        references: { model: "formGrids", key: "id" },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("answerLists");
  },
};
