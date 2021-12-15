const {
  checkRefeshToken,
  generateAccessToken,
  resendAccessToken,
} = require("../tokenFunctions");

const { DataTypes } = require("sequelize");
const db = require("../../models/index");
const User = require("../models/user/user")(db.sequelize, DataTypes);

module.exports = (req, res) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    return res.json({ data: null, message: "refresh token not provided" });
  }

  const refreshTokenData = checkRefeshToken(refreshToken);
  if (!refreshTokenData) {
    return res.json({
      data: null,
      message: "invalid refresh token, please log in again",
    });
  }

  const { userId } = refreshTokenData;
  User.findOne({ where: { userId } })
    .then((data) => {
      if (!data) {
        return res.json({
          data: null,
          message: "refresh token has been tempered",
        });
      }
      delete data.dataValues.password;

      const newAccessToken = generateAccessToken(data.dataValues);
      resendAccessToken(res, newAccessToken, data.dataValues);
    })
    .catch((err) => {
      console.log(err);
    });
};
