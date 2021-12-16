

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

        db['answer'].findOne({
            where:[
                {userEmail},
                {formId}
            ]
        })
        .then(async result => {
            if(result !== null){
                await res.status(400).send({
                    message:'aleady writed this form'
                });
            }else{
                db["answer"].create({
                    userEmail,
                    formId
                })
                .then(async result => {
        
                    let values = result.dataValues;
        
                    data.sort((a, b) => a.formContentId - b.formContentId);
        
                    for( let val of data){
                        val.answerId = values.id;
                        await db["answerList"].create(val);
                    }
                    res.status(201).send({
                        message:'ok'
                    });
                });
            }
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
            attributes: { exclude: ['UserId'] },
            where:[
                {userEmail},{formId}
            ]
        })
        .then(async result => {
            if(result === null){
                await res.status(400).send({
                    message:'answer not exist'
                })
            }
            let values = result.dataValues;
            console.log(values)
            sendData.answer = values;
            db['answerList'].findAll({
                attributes: { exclude: ['answerId'] },
                include:[
                    {
                        model:db['formContent'],
                        attributes:['question','id','type','section','order']
                    },
                    {
                        model:db['formOption'],
                        attributes:{exclude:['createdAt','updatedAt']}
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
    /* need commit */
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
            res.status(204).send({
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
                    attributes: { exclude: ['createdAt','updatedAt','UserEmail'] }
                },
                {
                    model:db['answerList'],
                    attributes: { exclude: ['createdAt','updatedAt','UserEmail'] },
                    include:[
                        {
                            model:db['formContent'],
                            attributes: { exclude: ['createdAt','updatedAt'] }
                        },
                        {
                            model:db['formOption'],
                            attributes: { exclude: ['createdAt','updatedAt'] }
                        }
                    ]
                }         
            ]
        })
        .then(result => {
            if(result.length === 0)
                res.status(400).send({
                    message:"doesn't have any answer"
                })
            let values = result.map(el => el.dataValues);
            res.status(200).send({
                data:values,
                message:'ok'
            });
        });
    },
    async updateAnswer(req,res){
        let changeData = req.body.data;

        for(let val of changeData){
            let id = val.id;
            delete val.id;
            await db['answerList'].update(val,{
                where:[
                    {id}
                ]
            })
        }

        res.status(201).send({
            message:'ok'
        });
    },
    async deleteAnswer(req,res){
        let id = req.params.id;

        if(!id){
            res.status(400).send({
                message:'formId not received'
            });
        }
        
        await db['answer'].destroy({
            where:[{id}]
        })
        .then(result => {
            db['answerList'].destroy({
                where:[
                    {
                        'answerId':id
                    }
                ]
            });
        });

        res.status(200).send({
            message:'ok'
        });
    }
}

