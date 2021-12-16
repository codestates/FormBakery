"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class answerList extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      //models.answerList.belongsTo(models.answer);
      models.answerList.belongsTo(models.formContent);
      models.answerList.belongsTo(models.formOption);
    }
  }
  answerList.init(
    {
      formContentId: DataTypes.INTEGER,
      answer: DataTypes.STRING,
      answerId: DataTypes.INTEGER,
      formOptionId: DataTypes.INTEGER
    },
    {
      sequelize,
      modelName: "answerList",
    }
  );
  return answerList;
};
