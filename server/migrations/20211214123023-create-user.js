'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('user', {
      email:{
        type:Sequelize.STRING,
        primaryKey:true
      },
      password:{
        type:Sequelize.STRING,
        allowNull:false
      },
      profilePicture:{
        type:Sequelize.STRING,
        allowNull:true
      },
      name:{
        type:Sequelize.STRING,
        allowNull:false
      },
      nickname:{
        type:Sequelize.STRING,
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
    await queryInterface.dropTable('Users');
  }
};