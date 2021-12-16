const dotenv = require("dotenv");
dotenv.config();

const db = require("../../models/index");
const jwt = require("jsonwebtoken");
const axios = require("axios");

const clientID = process.env.GITHUB_CLIENT_ID;
const clientSecret = process.env.GITHUB_CLIENT_SECRET;

const mailer = require("nodemailer");
const smtp = require("nodemailer-smtp-transport");

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

  emailAuth: async (req, res) => {
    let number = Math.floor(Math.random() * 1000000) + 100000;
    if (number > 1000000) {
      number = number - 100000;
    }

    const transporter = mailer.createTransport(
      smtp({
        service: "gmail",
        host: "smtp.gmail.com",
        auth: {
          user: "jsb9761321@gmail.com",
          pass: "tnql01!!",
        },
      })
    );

    const mailOpt = {
      from: "jsb9761321@gmail.com",
      to: req.body.email,
      subject: "Form Bakery 회원가입 인증번호 입니다.",
      html: `<h1>아래의 인증번호를 Form Bakery 홈페이지 인증번호창에 입력해 주세요.</h1><h3>[${number}]</h3>`,
    };

    transporter.sendMail(mailOpt, (err, info) => {
      if (err) throw err;
      else {
        res.status(200).send({ data: number, message: "emailAuth successful" });
      }
    });
  },

  signup: async (req, res) => {
    const { email, password, name, nickname } = req.body;
    if (!email || !password || !name || !nickname) {
      res.status(422).send({ message: "insufficient parameters supplied" });
    } else {
      const userInfo = await db["User"].findOne({
        where: { email },
      });
      if (userInfo) {
        res.status(409).send({ message: "email exists" });
      } else {
        db["User"].create({ email, password, name, nickname });
        const newUser = {
          email,
          name,
          nickname,
        };
        const accessToken = jwt.sign(newUser, process.env.ACCESS_SECRET, {
          expiresIn: "15m",
        });
        const refreshToken = jwt.sign(newUser, process.env.REFRESH_SECRET, {
          expiresIn: "30d",
        });
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
    }
  },

  signout: async (req, res) => {
    const { password } = req.body;
    const { email } = req.params;

    const userInfo = await db["User"].findOne({
      where: { email, password },
    });

    if (!userInfo) {
      res.status(404).send({ message: "incorrect password" });
    }

    db["User"].destroy({
      where: { id: userInfo.id },
    });
    res.send({ message: "signout successful" });
  },
};
