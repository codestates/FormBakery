const dotenv = require("dotenv");
dotenv.config();

const db = require("../../models/index");
const jwt = require("jsonwebtoken");

module.exports = {
  login: async (req, res) => {
    console.log(db.User);
    const userInfo = await db["User"].findOne({
      where: { email: req.params.email, password: req.body.password },
    });
    if (!userInfo) {
      res.status(401).send({ data: null, message: "unAuthorized" });
    } else {
      delete userInfo.dataValues.password;
      const accessToken = jwt.sign(
        userInfo.dataValues,
        process.env.ACCESS_SECRET,
        {
          expiresIn: "15m",
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
          samSite: "none",
        })
        .json({
          data: { accessToken: accessToken },
          message: "login successful",
        });
    }
  },
  logout(req, res) {
    if (!req.parmas.email) {
      res.status(401).json({ message: "user information is null" });
    }
    // 클라이언트에서 accessToken 지워주세요!
    const deleteCookie = function (name) {
      document.cookie = name + "=; expires=Thu, 01 Jan 1999 00:00:10 GMT;";
    };
    deleteCookie("refreshToken");
    res.status(200).send("logout successful");
  },
};
