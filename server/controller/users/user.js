
const { DataTypes } = require("sequelize");
const db = require("../../models/index");
const User = require("../../models/user")(db.sequelize, DataTypes);
const jwt = require("jsonwebtoken");

module.exports = {
  login: async (req, res) => {
    const userInfo = await User.findOne({
      where: { email: req.params.email, password: req.body.password },
    });

    if (!userInfo) {
      res.status(401).json({ data: null, message: "unAuthorized" });
    } else {
      delete userInfo.dataValues.password;

      const accessToken = jwt.sign(
        userInfo.dataValues,
        process.env.ACCESS_SECRET,
        {
          expiresIn: "15s",
        }
      );
      const refreshToken = jwt.sign(
        userInfo.dataValues,
        process.env.REFRESH_SECRET,
        {
          expiresIn: "30d",
        }
      );

      res
        .status(200)
        .cookie("refreshToken", refreshToken, {
          httpOnly: true,
          secure: true,
          samSite: "none",
        })
        .json({ data: { accessToken: accessToken }, message: "ok" })
        .catch((err) => alert(err));
    }
  },
  logout(req, res) {
    if (req.) {
      res.status(401).json({message:"accessToken not received"})
    }
    var deleteCookie = function (name) {
      document.cookie = name + "=; expires=Thu, 01 Jan 1999 00:00:10 GMT;";
    };
    deleteCookie("refreshToken");
    res.status(20).send("ok");
  },
};
