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
      models.formContent.hasMany(models.formGrid,{foreignKey: 'formContentId',onDelete: 'CASCADE',onUpdate:'CASCADE'});
      models.formContent.belongsTo(models.form,{foreignKey: 'formId',onDelete: 'CASCADE',onUpdate:'CASCADE'});
    }
  }
  formContent.init(
    {
      formId: DataTypes.INTEGER,
      type: DataTypes.STRING,
      question: DataTypes.STRING,
      section: DataTypes.INTEGER,
      order: DataTypes.INTEGER,
      content: DataTypes.STRING
    },
    {
      sequelize,
      modelName: "formContent",
    }
  );
  return formContent;
};
