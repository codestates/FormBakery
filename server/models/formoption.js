"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class formOption extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.formOption.hasMany(models.answerList,{foreignKey: 'formOptionId',onDelete: 'CASCADE',onUpdate:'CASCADE'});
      models.formOption.belongsTo(models.formContent);
    }
  }
  formOption.init(
    {
      formContentId: DataTypes.INTEGER,
      text: DataTypes.STRING,
      image: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "formOption",
    }
  );
  return formOption;
};
