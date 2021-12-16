const dotenv = require("dotenv");
dotenv.config();

const db = require("../../models/index");
const jwt = require("jsonwebtoken");
const axios = require("axios");

const clientID = process.env.GITHUB_CLIENT_ID;
const clientSecret = process.env.GITHUB_CLIENT_SECRET;

module.exports = {
  login: async (req, res) => {
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

  logout: async (req, res) => {
    // 클라이언트에서 accessToken 지워주세요!
    res.clearCookie("refreshToken");
    res.status(200).send("logout successful");
  },

  githubCallback: async (req, res) => {
    axios({
      method: "post",
      url: `https://github.com/login/oauth/access_token`,
      headers: {
        accept: "application/json",
      },
      data: {
        client_id: clientID,
        client_secret: clientSecret,
        code: req.body.authorizationCode,
      },
    })
      .then((result) =>
        res
          .status(200)
          .json({ accessToken: result.data.access_token, message: "ok" })
      )
      .catch((err) => res.status(404));
  },

  signup: async (req, res) => {
    res.send("dd");
  },
};
