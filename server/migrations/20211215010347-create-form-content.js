"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("formContents", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      formId: {
        type: Sequelize.STRING,
        allowNull: false,
        onDelete: "CASCADE",
        references: { model: "forms", key: "id" },
      },
      type: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      question: {
        type: Sequelize.STRING,
      },
      section: {
        type: Sequelize.INTEGER,
      },
      order: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      //only image, explane
      content: {
        type: Sequelize.STRING,
      },
      isNeccessary: {
        type: Sequelize.STRING,
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
    await queryInterface.dropTable("formContents");
  },
};
