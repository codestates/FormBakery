"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class answer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.answer.hasMany(models.answerList,{foreignKey: 'answerId',onDelete: 'CASCADE',onUpdate:'CASCADE'});
      models.answer.belongsTo(models.form);
      models.answer.belongsTo(models.User);
    }
  }
  answer.init(
    {
      userEmail: DataTypes.STRING,
      formId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "answer",
    }
  );
  return answer;
};
