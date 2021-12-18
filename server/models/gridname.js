'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class gridName extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  gridName.init({
    location: DataTypes.INTEGER,
    text: DataTypes.STRING,
    formContentId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'gridName',
  });
  return gridName;
};