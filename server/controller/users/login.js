const { DataTypes } = require("sequelize");
const db = require("../../models/index");
const User = require("../models/user/user")(db.sequelize, DataTypes);

const {
  generateAccessToken,
  generateRefreshToken,
  sendRefreshToken,
  sendAccessToken,
} = require("../tokenFunctions");

module.exports = (req, res) => {
  const { email, password } = req.body;
  User.findOne({
    where: {
      email,
      password,
    },
  })
    .then((data) => {
      if (!data) {
        return res.status(401).json({ message: "unAuthorized" });
      }
      delete data.dataValues.password;
      const accessToken = generateAccessToken(data.dataValues);
      const refreshToken = generateRefreshToken(data.dataValues);

      sendRefreshToken(res, refreshToken);
      sendAccessToken(res, accessToken);
    })
    .catch((err) => {
      console.log(err);
    });
};
