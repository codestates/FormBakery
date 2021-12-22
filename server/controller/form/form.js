const e = require("express");
const db = require("../../models/index");
const recommandData = require("../../data/recommandData");
const { Op, UUIDV1 } = require("sequelize");
const dbMethod = require("../../method/dbMethod");
const customMethod = require("../../method/custom");
module.exports = {
  /*
        Form 생성

    */
  async create(req, res) {
    let id = req.params.id;
    let userEmail = req.body.email;
    let recoType = req.body.recommand ? req.body.recommand : "default";

    let insertData = recommandData[recoType];
    insertData.id = id;
    insertData.userEmail = userEmail;
    let find = await db["form"].findOne({
      where: { id: insertData.id },
    });
    if (find) {
      res.status(400).send({
        message: "This form already exist",
      });
      return;
    }
    const transaction = await db.sequelize.transaction();
    let data = insertData.questions;
    let imageId = [];
    let form = {
      id,
      userEmail,
      title: insertData.title,
      subTitle: insertData.subTitle,
    };
    db["User"]
      .findOne({
        where: {
          email: userEmail,
        },
      })
      .then((result) => {
        if (result === null) {
          res.status(401).send({
            message: "This email not exist",
          });
        } else {
          try {
            db["form"].create(form, { transaction }).then(async (result) => {
              let formId = result.id;

              for (let el of data) {
                let options;
                let gridData;
                el.formId = formId;
                if (el.formOptions) {
                  options = el.formOptions;
                  delete el.formOptions;
                }
                if (el.gridData) {
                  gridData = el.gridData;
                  delete el.gridData;
                }
                await db["formContent"]
                  .create(el, { transaction })
                  .then(async (result) => {
                    let formContentId = result.dataValues.id;
                    if (el.type === "image") imageId.push(formContentId);
                    if (
                      el.type === "check" ||
                      el.type === "radio" ||
                      el.type === "drop"
                    ) {
                      options = options.map((t) => {
                        return {
                          formContentId,
                          text: t,
                        };
                      });
                      db["formOption"].bulkCreate(options, { transaction });
                    }
                    if (el.type === "grid") {
                      console.log(gridData);
                      await db["formGrid"]
                        .create(
                          {
                            formContentId,
                            row: gridData.row,
                            col: gridData.col,
                          },
                          { transaction }
                        )
                        .then((result) => {
                          let res = result.dataValues;
                          let grids = [
                            ...gridData.rawName.map((t, idx) => {
                              return {
                                text: t,
                                location: idx,
                                isRaw: "y",
                                formGridId: res.id,
                              };
                            }),
                            ...gridData.colName.map((t, idx) => {
                              return {
                                text: t,
                                location: idx,
                                isRaw: "n",
                                formGridId: res.id,
                              };
                            }),
                          ];
                          db["gridName"].bulkCreate(grids, { transaction });
                        });
                    }
                  });
              }
              await transaction.commit();
              dbMethod.getForm(req, res, db);
            });
          } catch (err) {
            res.status(400).send({
              message: "database err",
              code: err,
            });
          }
        }
      });
  },
  /*
        form Content image 저장
    */
  uploadImageLink(req, res) {
    let id = req.params.id;
    const {
      fieldname,
      originalname,
      encoding,
      mimetype,
      destination,
      filename,
      path,
      size,
    } = req.file;
    db["formContent"]
      .update(
        {
          content: filename,
        },
        {
          where: [{ id }],
        }
      )
      .then((result) => {
        res.status(201).send({
          message: "ok",
        });
      });
  },
  /*
        form 가져오기 (get one)
    */
  getForm(req, res) {
    let id = req.params.id;
    dbMethod.getForm(req, res, db);
    // db["form"]
    //   .findOne({
    //     where: { id },
    //     include: {
    //       model: db["formContent"],
    //       attributes: { exclude: ["createdAt", "updatedAt", "formId"] },
    //       include: [
    //         {
    //           model: db["formOption"],
    //           attributes: {
    //             exclude: ["createdAt", "updatedAt", "formContentId"],
    //           },
    //           separate: true,
    //           order: [["id", "ASC"]],
    //         },
    //         {
    //           model: db["formGrid"],
    //           attributes: {
    //             exclude: ["createdAt", "updatedAt", "formContentId"],
    //           },
    //           include: {
    //             model: db["gridName"],
    //             attributes: {
    //               exclude: ["createdAt", "updatedAt", "formGridId"],
    //             },
    //             separate: true,
    //             order: [
    //               ["isRaw", "ASC"],
    //               ["id", "ASC"],
    //             ],
    //           },
    //         },
    //       ],
    //     },
    //     order: [[db["formContent"], "order", "ASC"]],
    //   })
    //   .then((result) => {
    //     if (result === null) {
    //       res.status(400).send({
    //         message: "form not exist",
    //       });
    //     } else {
    //       let data = result.dataValues;

    //       data.formContents = data.formContents.map((t) => {
    //         if (t.formOptions.length === 0) delete t.dataValues.formOptions;
    //         if (t.formGrids.length === 0) delete t.dataValues.formGrids;
    //         if (t.content === null) delete t.dataValues.content;
    //         return t;
    //       });

    //       res.status(200).send({
    //         message: "ok",
    //         data,
    //       });
    //     }
    //   });
  },
  /*
        form List 가져오기
    */
  getFormList(req, res) {
    let userEmail = req.params.email;

    db["form"]
      .findAll({
        where: [{ userEmail }],
        include: {
          model: db["formContent"],
          attributes: { exclude: ["createdAt", "updatedAt", "formId"] },
          order: [["order", "ASC"]],
          include: [
            {
              model: db["formOption"],
              attributes: {
                exclude: ["createdAt", "updatedAt", "formContentId"],
              },
              separate: true,
              order: [["id", "ASC"]],
            },
            {
              model: db["formGrid"],
              attributes: {
                exclude: ["createdAt", "updatedAt", "formContentId"],
              },
              include: {
                model: db["gridName"],
                attributes: {
                  exclude: ["createdAt", "updatedAt", "formGridId"],
                },
                separate: true,
                order: [
                  ["isRaw", "ASC"],
                  ["id", "ASC"],
                ],
              },
            },
          ],
        },
      })
      .then((result) => {
        let sendData = result.map((qst) => {
          let data = qst.dataValues;
          data.formContents = data.formContents.map((t) => {
            if (t.formOptions.length === 0) delete t.dataValues.formOptions;
            if (t.formGrids.length === 0) delete t.dataValues.formGrids;
            if (t.content === null) delete t.dataValues.content;
            return t;
          });
          return data;
        });

        if (sendData.length === 0) {
          res.status(400).send({
            message: "form not exist",
          });
        } else {
          res.status(200).send({
            message: "ok",
            data: sendData,
          });
        }
      });
  },

  /*
        Grid 추가로 인한 추가 수정 필요
    */
  async updateForm(req, res) {
    let id = req.params.id;
    const transaction = await db.sequelize.transaction();
    if (!id) res.status(400).send({ message: "id not exist" });

    let find = await db["form"].findOne({ where: { id } });
    if (find === null) {
      res.status(400).send({
        message: "form not exist",
      });
      return;
    }
    try {
      await db["form"].update(
        {
          upatedAt: customMethod.dateToString(new Date(), "-", true),
        },
        { where: { id } },
        { transaction }
      );
      await db["formContent"].destroy(
        {
          where: [{ formId: id }],
        },
        { transaction }
      );
      let data = req.body.questions;
      let imageId = [];
      let form = {
        title: req.body.title,
      };
      if (req.body.subTitle) form.subTitle = req.body.subTitle;
      db["form"]
        .update(form, { where: { id } }, { transaction })
        .then(async (result) => {
          await db["answer"].destroy(
            { where: { formId: id } },
            { transaction }
          );
          let formId = id;
          data.sort((a, b) => a.order - b.order);
          for (let el of data) {
            let options;
            let gridData;
            el.formId = formId;
            if (el.formOptions) {
              options = el.formOptions;
              delete el.formOptions;
            }
            if (el.gridData) {
              gridData = el.gridData;
              delete el.gridData;
            }
            await db["formContent"]
              .create(el, { transaction })
              .then(async (result) => {
                let formContentId = result.dataValues.id;
                if (el.type === "image") imageId.push(formContentId);
                if (
                  el.type === "check" ||
                  el.type === "radio" ||
                  el.type === "drop"
                ) {
                  options = options.map((t) => {
                    return {
                      formContentId,
                      text: t,
                    };
                  });
                  db["formOption"].bulkCreate(options, { transaction });
                }
                if (el.type === "grid") {
                  await db["formGrid"]
                    .create(
                      {
                        formContentId,
                        row: gridData.row,
                        col: gridData.col,
                      },
                      { transaction }
                    )
                    .then((result) => {
                      let res = result.dataValues;
                      let grids = [
                        ...gridData.rawName.map((t, idx) => {
                          return {
                            text: t,
                            location: idx,
                            isRaw: "y",
                            formGridId: res.id,
                          };
                        }),
                        ...gridData.colName.map((t, idx) => {
                          return {
                            text: t,
                            location: idx,
                            isRaw: "n",
                            formGridId: res.id,
                          };
                        }),
                      ];
                      db["gridName"].bulkCreate(grids, { transaction });
                    });
                }
              });
          }
          await transaction.commit();
          res.status(201).send({
            message: "ok",
            data: imageId,
          });
        });
    } catch (err) {
      res.status(400).send({
        message: "database err",
        code: err,
      });
    }
  },
  deleteForm(req, res) {
    let id = req.params.id;

    if (!id) {
      res.status(400).send({ message: "id not exist" });
      return;
    }

    db["form"]
      .destroy({
        where: [{ id }],
      })
      .then((result) => {
        res.status(200).send({ message: "ok" });
      });
  },
  recommandForm(req, res) {},
};
