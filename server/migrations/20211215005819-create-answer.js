"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("answers", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userEmail: {
        type: Sequelize.STRING,
        onDelete: "CASCADE",
        references: { model: "Users", key: "email" },
      },
      formId: {
        type: Sequelize.STRING,
        onDelete: "CASCADE",
        references: { model: "forms", key: "id" },
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
    await queryInterface.dropTable("answers");
  },
};
