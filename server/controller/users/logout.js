const { DataTypes } = require("sequelize");
const db = require("../../models/index");
const User = require("../models/user/user")(db.sequelize, DataTypes);

module.exports = (req, res) => {
  var deleteCookie = function (name) {
    document.cookie = name + "=; expires=Thu, 01 Jan 1999 00:00:10 GMT;";
  };
  deleteCookie("refreshToken");

  res.status(205).send("Logged out successfully");
};
