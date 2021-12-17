const mailer = require("nodemailer");
const smtp = require("nodemailer-smtp-transport");
const config = require("../config/mailConfig");

const transporter = mailer.createTransport(
    config.smtp
);

module.exports = {
    sendEmail(req,res,from,to,subject,content, isHtml = false){
        const mailOpt = {
            from,
            to,
            subject,
        };
        isHtml ? mailOpt.html = content:mailOpt.text = content;
        transporter.sendMail(mailOpt,(err,info) => {
            if(err){
                res.status(400).send({
                    message:'mail send fail',
                    code:err
                })
            }
            else{
                console.log(`sent: ${info.response}`);
                res.send(200).send({
                    message:'ok'
                })
            }
        });
    }
}