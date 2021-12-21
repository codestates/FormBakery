const mailer = require("nodemailer");
const smtp = require("nodemailer-smtp-transport");
const config = require("../config/config");

const transporter = mailer.createTransport(config.smtp);

module.exports = {
  sendEmail(
    req,
    res,
    from,
    to,
    subject,
    content,
    isHtml = false,
    number = "null"
  ) {
    const mailOpt = {
      from,
      to,
      subject,
    };
    isHtml ? (mailOpt.html = content) : (mailOpt.text = content);
    transporter.sendMail(mailOpt, (err, info) => {
      if (err) {
        res.status(400).send({
          message: "mail send fail",
          code: err,
        });
      } else {
        console.log(`sent: ${info.response}`);
        res.status(200).send({ data: number, message: "ok" });
      }
    });
  },
};
