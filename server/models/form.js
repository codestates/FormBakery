"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class form extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  form.init(
    {
      title: DataTypes.STRING,
      userEmail: DataTypes.STRING,
      subTitle: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "form",
    }
  );
  return form;
};
