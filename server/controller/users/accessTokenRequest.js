const dotenv = require("dotenv");
dotenv.config();

const db = require("../../models/index");
const jwt = require("jsonwebtoken");

module.exports = {
  /*
      accessToken 생성
  */
  accessTokenRequest: async (req, res, type) => {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
      res.status(403).json({ message: "refresh token not provided" });
    } else {
      jwt.verify(
        refreshToken,
        process.env.REFRESH_SECRET,
        async (err, decoded) => {
          if (err) {
            res.status(400).json({
              message: "invalid refresh token, please log in again",
            });
          } else {
            const userInfo = await db["User"].findOne({
              where: { email: decoded.email },
            });
            delete userInfo.dataValues.password;

            if (!userInfo) {
              res.status(404).json({
                message: "refresh token has been tempered",
              });
            } else {
              const accessToken = jwt.sign(
                userInfo.dataValues,
                process.env.ACCESS_SECRET,
                {
                  expiresIn: "15m",
                }
              );
              if (type === "update") {
                const { email } = req.params;
                const { name, nickname } = req.body;
                await db["User"].update(
                  { name, nickname },
                  { where: { email } }
                );
                userInfo.dataValues.name = name;
                userInfo.dataValues.nickname = nickname;
              }

              res.status(200).json({
                data: {
                  userInfo: userInfo.dataValues,
                  accessToken: accessToken,
                },
                message: "ok",
              });
            }
          }
        }
      );
    }
  },
};
