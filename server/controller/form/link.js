const mailMethod = require('../../method/mail');

module.exports ={
    sendLink(req,res){
        let title = `Form Bakery - Form 작성 요청`
        let html = 
        `<div style="background-color:#ffff66;">
            <h1>Form Bakery Link<h1>
            <h2>${req.body.title} 설문을 작성해 주세요!</h2>
            <h3>문의: ${req.body.userEmail}</h2>
            <br>
            <div>
                <a href="${req.body.link}" style="font-size:15px">폼 작성하러 가기</a>
            </div>
        </div>`

        mailMethod.sendEmail(req,res, req.body.userEmail, req.params.email, title, html, true);
    }
}