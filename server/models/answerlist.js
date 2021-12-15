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
      // define association here
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
