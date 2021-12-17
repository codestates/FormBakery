

const db = require("../../models/index");

module.exports = {

    /*
        설문 작성
    */
    create(req,res){
        let userEmail = req.params.email;
        let formId = req.body.formId;
        let data = req.body.data;

        for(let val of data){
            if(
                !val.answer &&
                !val.formOptionId
            ){
                res.status(400).send({
                    message:"data not received"
                });
                return;
            }
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

    /*
        설문 내역 가져오기(get one)
    */
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
            attributes: { exclude: ['UserEmail'] },
            where:[
                {userEmail},{formId}
            ],
            include:[
                {
                    model:db['form'],
                    attributes:["title","subTitle","userEmail"]
                },
                {
                    model:db['answerList'],
                    attributes:{exclude:['answerId']},
                    separate:true,
                    order:[['id','ASC']],
                    include:[
                        {
                            model:db['formContent'],
                            attributes:['question','id','type','section','order']
                        },
                        {
                            model:db['formOption'],
                            attributes:{exclude:['createdAt','updatedAt']}
                        }
                    ]
                }
            ]
        })
        .then(result => {

            let send = result;

            send.answerLists = send.answerLists.map(el => {
                if(el.dataValues.formOption === null)
                    delete el.dataValues.formOption;
                if(el.dataValues.formOptionId === null)
                    delete el.dataValues.formOptionId
                if(el.dataValues.answer === null)
                    delete el.dataValues.answer
                return el
            });
            res.status(200).send({
                message:'ok',
                data:send
            })
        })
    },

    /*
        설문내역 리스트 가져오기
        수정필요
    */
    getAnswerList(req,res){
        let userEmail = req.body.userEmail;
        let formId = req.body.formId;
        let sendParam = {}
        if(req.body.use === 'user')
            sendParam.userEmail = userEmail;
        if(req.body.use === 'form')
            sendParam.formId = formId;
        if(
            (!userEmail && req.body.use === 'user') ||
            (!formId && req.body.use === 'form')
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
        .then(async result => {

            let statistics = {}
            let values = result.map(el => el.dataValues);
            if(result.length === 0){
                res.status(400).send({
                    message:"doesn't have any answer"
                })
                return;
            }



            // 통계 가져오기
            let i = 0;
            for(let t of values){

                values[i].answerLists = t.answerLists.map(el => {
                    if(el.dataValues.formOption === null)
                        delete el.dataValues.formOption;
                    if(el.dataValues.formOptionId === null)
                        delete el.dataValues.formOptionId
                    if(el.dataValues.answer === null)
                        delete el.dataValues.answer
                    return el
                });

                for(let v of t.answerLists){
                    let answer = v.dataValues;
                    let content = answer.formContent.dataValues;
                    
                    if(
                        content.type === 'short' ||
                        content.type === 'long' ||
                        content.type === 'calender' ||
                        content.type === 'tile'
                    ){
                        if(statistics[''+content.id] === undefined){
                            statistics[''+content.id] = {
                                question:content.question,
                                data:[]
                            };
                        }
                        statistics[''+content.id].data.push(answer.answer);
                    }else{
                        if(statistics[''+content.id] === undefined){
                            let options = await db['formOption'].findAll({
                                where:{
                                    formContentId:answer.formOption.formContentId
                                }
                            });
                            statistics[''+content.id] = {};
                            statistics[''+content.id].question = content.question;
                            for(let option of options){
                                let val = option.dataValues;
                                statistics[''+content.id][''+val.id] = {
                                    count:0,
                                    text:val.text
                                }
                            }
                        }
                        statistics[''+content.id][''+answer.formOption.id].count += 1;
                    }
                }
                i++;
            }



            res.status(200).send({
                data:{
                    value:values,
                    statistics
                },
                message:'ok'
            });
        });
    },

    /*
        설문 내역 업데이트
    */
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

    /*
        설문 내역 삭제
    */
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

