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
      models.form.hasMany(models.formContent,{foreignKey: 'formId',onDelete: 'CASCADE',onUpdate:'CASCADE'});
      models.form.hasMany(models.answer,{foreignKey: 'formId',onDelete: 'CASCADE',onUpdate:'CASCADE'});
      models.form.belongsTo(models.User);
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
