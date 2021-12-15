
const db = require("../../models/index");

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

        db["answer"].create({
            userEmail,
            formId
        })
        .then(async result => {
            let values = result.dataValues;
            for( let val of data){
                val.answerId = values.formId;
                await db["answerList"].create(val);
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
        db['answer'].findOne({
            where:[
                {userEmail},{formId}
            ]
        })
        .then(result => {
            let values = result.dataValues;
            sendData.answer = values;
            db['answerList'].findAll({
                attributes: { exclude: ['answerId'] },
                include:[
                    {
                        model:db['formContent'],
                        attributes:['question','id','type','section','order']
                    }
                ],
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
    },

    getAnswerList(req,res){
        let userEmail = req.body.userEmail;
        let formId = req.body.formId;
        let sendParam = {}
        if(req.body.use === 'user')
            sendParam.userEmail = userEmail;
        if(req.body.use === 'form')
            sendParam.formId = formId;
        if(
            !userEmail &&
            !formId
        ){
            res.status(400).send({
                message:'userEmail or formId not received'
            });
        }

        db['answer'].findAll({
            where:[
                sendParam
            ],
            include:[
                {
                    model:db['form'],
                    attributes:['title','subTitle']
                }
            ]
        })
        .then(result => {
            let values = result.map(el => el.dataValues);
            res.status(200).send(values);
        });
    },

    deleteAnswer(req,res){
        let id = req.body.id;

        if(!id){
            res.status(400).send({
                message:'formId not received'
            });
        }
        
        db['answer'].destroy({
            where:[{id}]
        });

        res.status(200).send({
            message:'ok'
        });
    }
}