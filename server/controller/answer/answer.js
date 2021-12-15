const { DataTypes } = require('sequelize');
const db = require("../../models/index");
const answer = require('../../models/answer')(db.sequelize,DataTypes);
const answerList = require('../../models/answerlist')(db.sequelize,DataTypes);

module.exports = {
    create(req,res){
        let userEmail = req.params.email;
        let formId = req.body.formId;
        let data = req.body.data;

        for(let val of data){
            if(
                !val.answer &&
                !val.formOptionId
            )
                res.status(400).send({
                    message:"data not received"
                });
        }

        answer.create({
            userEmail,
            formId
        })
        .then(async result => {
            let values = result.dataValues;
            for( let val of data){
                val.answerId = values.formId;
                await answerList.create(val);
            }
            res.status(201).send({
                message:'ok'
            })
        })

    },
    getAnswer(req,res){
        let userEmail = req.params.email;
        let formId = req.body.formId;
        let sendData = {}
        if(
            !userEmail ||
            !formId
        ){
            res.status(400).send({
                message:'user Email or formId not received'
            })
        }
        answer.findOne({
            where:[
                {userEmail},{formId}
            ]
        })
        .then(result => {
            let values = result.dataValues;
            sendData.answer = values;
            answerList.findAll({
                attributes: { exclude: ['answerId'] },
                where:[
                    {answerId:values.id}
                ]
            })
            .then(result => {
                sendData.values = result.map(el => {
                    return el.dataValues;
                });
                res.send({
                    data:sendData,
                    message:'ok'
                });
            });
        })
    }

}