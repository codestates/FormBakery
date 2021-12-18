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
      models.gridName.belongsTo(models.formGrid);
    }
  };
  gridName.init({
    location: DataTypes.INTEGER,
    text: DataTypes.STRING,
    isRaw: DataTypes.STRING,
    formGridId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'gridName',
  });
  return gridName;
};