'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class formGrid extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  formGrid.init({
    col: DataTypes.INTEGER,
    row: DataTypes.INTEGER,
    formContentId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'formGrid',
  });
  return formGrid;
};