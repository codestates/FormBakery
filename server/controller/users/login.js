const { User } = require("../../models/user");
const jwt = require("jsonwebtoken");

module.exports = async (req, res) => {
  // TODO: urclass의 가이드를 참고하여 POST /login 구현에 필요한 로직을 작성하세요.
  const userInfo = await User.findOne({
    where: { userId: req.body.userId, password: req.body.password },
  });

  if (!userInfo) {
    res.status(400).json({ data: null, message: "not authorized" });
  } else {
    delete userInfo.dataValues.password;
    // 정보 보안을 위해 password를 삭제해준다.

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
};
