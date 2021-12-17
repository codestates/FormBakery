const e = require("express");
const db = require("../../models/index");
const { Op } = require('sequelize');
module.exports = {

    /*
        Form 생성
    */
    create(req,res){
        let userEmail = req.params.email;
        let data = req.body.questions;
        let imageId = [];
        let form = {
            userEmail,
            title:req.body.title
        }
        if(req.body.subTitle)
            form.subTitle = req.body.subTitle;

        db['User'].findOne({
            where:{
                email:userEmail
            }
        })
        .then(result => {
            if(result === null){
                res.status(400).send({
                    message:'This email not exist'
                })
            }else{
                db['form'].create(form)
                .then(async result => {
                    let formId = result.id;
                    data.sort((a,b) => a.order - b.order);

                    for(let el of data){
                        let options;
                        el.formId = formId;
                        if(el.formOptions){
                            options = el.formOptions;
                            delete el.formOptions;
                        }
                        await db['formContent'].create(el)
                            .then(async result => {
                                let formContentId = result.dataValues.id;
                                if(el.type === 'image')
                                    imageId.push(formContentId);
                                if(
                                    el.type === 'check' ||
                                    el.type === 'radio' ||
                                    el.type === 'drop'
                                ){
                                    options = options.map(t => {
                                        return {
                                            formContentId,
                                            text:t
                                        }
                                    })
                                    db['formOption'].bulkCreate(options);
                                }
                            });
                    }
                    res.status(201).send({
                        message:'ok',
                        data:imageId
                    });
                })
            }
        })
    },
    /*
        form Content image 저장
    */
    uploadImageLink(req,res){
        let id = req.params.id;
        const { fieldname, originalname, encoding, mimetype, destination, filename, path, size } = req.file
        db['formContent'].update({
            question:filename
        },{
            where:[
                {id}
            ]
        })
        .then(result => {
            res.status(201).send({
                message:'ok'
            });
        })

    },
    /*
        form 가져오기 (get one)
    */
    getForm(req,res){
        let id = req.params.id;
        
        db['form'].findOne({
            where:{ id },
            include:{
                model:db['formContent'],
                attributes:{ exclude:['createdAt','updatedAt','formId'] },
                include:{
                    model:db['formOption'],
                    attributes:{ exclude:['createdAt','updatedAt','formContentId'] },
                    separate: true,
                    order:[['id','ASC']]
                }
            },
            order:[
                [db['formContent'],'order','ASC']
            ]
        })
        .then(result => {
            if(result === null){
                res.status(400).send({
                    message:'form not exist'
                });
            }else{
                let data = result.dataValues;

                data.formContents = data.formContents.map(t => {
                    if(t.formOptions.length === 0)
                        delete t.dataValues.formOptions
                    return t;
                });

                res.status(200).send({
                    message:'ok',
                    data
                });
            }
        })
    },
    /*
        form List 가져오기
    */
    getFormList(req,res){
        let userEmail = req.params.email;

        db['form'].findAll({
            where:[{userEmail}],
            include:{
                model:db['formContent'],
                attributes:{exclude:['createdAt','updatedAt','formId']},
                order:[['order','ASC']],
                include:{
                    model:db['formOption'],
                    attributes:{exclude:['createdAt','updatedAt','formContentId']},
                    separate:true,
                    order:[['id','ASC']]
                }
            }
        })
        .then(result => {
            let sendData = result;
            if(sendData.length === 0){
                res.status(400).send({
                    message:'form not exist'
                });
            }else{
                res.status(200).send({
                    message:'ok',
                    data:sendData
                })
            }
        });
    },

    /*
        테스트 필요
    */
    async updateForm(req,res){
        if(
            !req.body ||
            !req.body.formContents.length ||
            req.body.formContents.length === 0
        ){
            await res.status(400).send({
                message:'data not exist'
            });
        }else{
            let data = req.body;
            let id = req.params.id;

            db['form'].update({
                title:data.title,
                subTitle:data.subTitle
            },
            {where:[{id}]})
            .then(async result => {
                let values = result.dataValues;
                for(let content of data.formContents){
                    let id = content.id
                    delete content.id;
                    await db['formContent'].update(content,{
                        where:{id}
                    })
                    .then(async result => {
                        if(
                            content.formOptions &&
                            content.formOptions.length > 0
                        ){
                            for(let option of content.formOptions){
                                let optionId = option.id
                                delete option.id;
                                await db['formOption'].update(option,{
                                    where:{id:optionId}
                                });
                            }
                        }
                    })
                }

                res.status(200).send({
                    message:'ok'
                });
            })
        }
    }
}