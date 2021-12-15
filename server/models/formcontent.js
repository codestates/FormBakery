"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class formContent extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  formContent.init(
    {
      formId: DataTypes.INTEGER,
      type: DataTypes.STRING,
      question: DataTypes.STRING,
      section: DataTypes.INTEGER,
      order: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "formContent",
    }
  );
  return formContent;
};
