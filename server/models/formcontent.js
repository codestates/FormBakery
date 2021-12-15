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
      models.formContent.hasMany(models.formOption,{foreignKey: 'formContentId',onDelete: 'CASCADE',onUpdate:'CASCADE'});
      models.formContent.hasMany(models.answerList,{foreignKey: 'formContentId',onDelete: 'CASCADE',onUpdate:'CASCADE'});
      models.formContent.belongsTo(models.form);
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
