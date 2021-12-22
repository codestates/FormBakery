const answer = require("../../models/answer");
const db = require("../../models/index");
const customMethod = require("../../method/custom");
module.exports = {
  /*
        설문 작성
    */
  async create(req, res) {
    const transaction = await db.sequelize.transaction();
    let userEmail = req.params.email;
    let formId = req.body.formId;
    let data = req.body.data;
    let i = 0;

    let form = await db["form"].findOne({ where: [{ id: formId }] });
    if (!form) {
      res.status(400).send({
        message: "invalid access(form not exist)",
      });
      return;
    }
    let answer = await db["answer"].findOne({
      where: [{ userEmail }, { formId }],
    });

    if (answer) {
      await res.status(400).send({
        message: "invalid access(aleady writed this form)",
      });
      return;
    }

    let formContent = await db["formContent"].findAll({
      where: { formId: form.dataValues.id },
    });

    for (let val of data) {
      let find = formContent.find(
        (item) => item.dataValues.id === val.formContentId
      );
      if (!find) {
        await res.status(400).send({
          message: "invalid access(formContent not exist)",
        });
        return;
      }

      if (!val.answer && !val.formOptionId && (!val.row || !val.col)) {
        res.status(400).send({
          message: "data not received",
        });
        return;
      }
      // let formContent = await db["formContent"].findOne({
      //   where: { id: val.formContentId },
      // });
      // if (formContent === null) {
      //   res.status(400).send({
      //     message: "invalid access",
      //   });
      //   return;
      // }
      if (val.row && val.col) {
        data[i].answer = val.row + "." + val.col;
        delete data[i].row, data[i].col;
        let grid = await db["formGrid"].findOne({
          where: { formContentId: val.formContentId },
        });
        data[i].formGridId = grid.dataValues.id;
      }
      i++;
    }
    try {
      db["answer"]
        .create(
          {
            userEmail,
            formId,
          },
          { transaction }
        )
        .then(async (result) => {
          let values = result.dataValues;
          data.sort((a, b) => a.formContentId - b.formContentId);

          for (let val of data) {
            val.answerId = values.id;
            await db["answerList"].create(val, { transaction });
          }
          await transaction.commit();
          res.status(201).send({
            message: "ok",
          });
        });
    } catch (err) {
      console.log("catch");
      res.status(400).send({
        message: "database err",
        code: err,
      });
    }
  },

  /*
        설문 내역 가져오기(get one)
    */
  getAnswer(req, res) {
    let userEmail = req.params.email;
    let formId = req.body.formId;
    let sendData = {};
    if (!userEmail || !formId) {
      res.status(400).send({
        message: "user Email or formId not received",
      });
    }
    db["answer"]
      .findOne({
        attributes: { exclude: ["UserEmail", "createdAt", "updatedAt"] },
        where: [{ userEmail }, { formId }],
        include: [
          {
            model: db["form"],
            attributes: ["title", "subTitle", "userEmail"],
          },
          {
            model: db["answerList"],
            attributes: { exclude: ["answerId"] },
            separate: true,
            order: [["id", "ASC"]],
            include: [
              {
                model: db["formContent"],
                attributes: ["question", "id", "type", "section", "order"],
              },
              {
                model: db["formOption"],
                attributes: { exclude: ["createdAt", "updatedAt"] },
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
        ],
      })
      .then((result) => {
        if (result === null) {
          res.status(400).send({
            message: "answer not exist",
          });
          return;
        }
        let send = result.dataValues;

        send.answerLists = send.answerLists.map((el) => {
          deleteNullContent(el);

          let separate;
          if (el.dataValues.formGridId) {
            separate = el.dataValues.answer.split(".");
            el.dataValues.row = Number(separate[0]);
            el.dataValues.col = Number((el.col = separate[1]));
            delete el.dataValues.answer;
          }
          return el;
        });
        res.status(200).send({
          message: "ok",
          data: send,
        });
      });
  },

  /*
        설문내역 리스트 가져오기
        수정필요
    */
  getAnswerList(req, res) {
    let userEmail = req.body.userEmail;
    let formId = req.body.formId;
    let sendParam = {};
    if (req.body.use === "user") sendParam.userEmail = userEmail;
    if (req.body.use === "form") sendParam.formId = formId;
    if (
      (!userEmail && req.body.use === "user") ||
      (!formId && req.body.use === "form")
    ) {
      res.status(400).send({
        message: "userEmail or formId not received",
      });
    }

    db["answer"]
      .findAll({
        where: [sendParam],
        order: [["updatedAt", "DESC"]],
        include: [
          {
            model: db["form"],
            attributes: { exclude: ["createdAt", "updatedAt", "UserEmail"] },
          },
          {
            model: db["answerList"],
            attributes: { exclude: ["createdAt", "updatedAt", "UserEmail"] },
            include: [
              {
                model: db["formContent"],
                attributes: ["question", "id", "type", "section", "order"],
              },
              {
                model: db["formOption"],
                attributes: { exclude: ["createdAt", "updatedAt"] },
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
        ],
      })
      .then(async (result) => {
        let statistics = {};
        let values = result.map((el) => el.dataValues);
        if (result.length === 0) {
          res.status(400).send({
            message: "doesn't have any answer",
          });
          return;
        }

        // 통계 가져오기
        let i = 0;
        for (let t of values) {
          values[i].answerLists.sort(
            (a, b) =>
              a.dataValues.formContent.order - b.dataValues.formContent.order
          );

          values[i].answerLists = t.answerLists.map((el) => {
            deleteNullContent(el);
            let separate;
            if (el.dataValues.formGridId) {
              separate = el.dataValues.answer.split(".");
              el.dataValues.row = Number(separate[0]);
              el.dataValues.col = Number((el.dataValues.col = separate[1]));
              delete el.dataValues.answer;
            }
            return el;
          });

          if (req.body.use === "form") {
            for (let v of t.answerLists) {
              let answer = v.dataValues;
              let content = answer.formContent.dataValues;
              if (
                content.type === "short" ||
                content.type === "long" ||
                content.type === "calender" ||
                content.type === "tile"
              ) {
                if (statistics["" + content.id] === undefined) {
                  statistics["" + content.id] = {
                    question: content.question,
                    type: content.type,
                    data: [],
                  };
                }
                statistics["" + content.id].data.push(answer.answer);
              } else if (
                content.type === "radio" ||
                content.type === "check" ||
                content.type === "drop"
              ) {
                if (statistics["" + content.id] === undefined) {
                  let options = await db["formOption"].findAll({
                    where: {
                      formContentId: answer.formContentId,
                    },
                  });
                  statistics["" + content.id] = {};
                  statistics["" + content.id].question = content.question;
                  statistics["" + content.id].type = content.type;

                  for (let option of options) {
                    let val = option.dataValues;
                    statistics["" + content.id]["" + val.id] = {
                      count: 0,
                      text: val.text,
                    };
                  }
                }
                statistics["" + content.id][
                  "" + answer.formOption.id
                ].count += 1;
              } else if (
                content.type === "grid" &&
                answer.formGrid !== undefined
              ) {
                if (statistics["" + content.id] === undefined) {
                  let arr = new Array(answer.formGrid.dataValues.row);
                  for (let i = 0; i < answer.formGrid.dataValues.row; i++)
                    arr[i] = new Array(answer.formGrid.dataValues.col).fill(0);

                  statistics["" + content.id] = {
                    question: content.question,
                    data: arr,
                    gridNames: answer.formGrid.gridNames,
                  };
                }
                console.log(answer.row + "." + answer.col);
                statistics["" + content.id].data[Number(answer.row)][
                  Number(answer.col)
                ]++;
              }
            }
            i++;
          }
        }
        let statisticsArr = [];

        for (let key in statistics) {
          statisticsArr.push(statistics[key]);
        }

        res.status(200).send({
          data: {
            value: values,
            statistics: statisticsArr,
          },
          message: "ok",
        });
      });
  },

  /*
        설문 내역 업데이트 - checkbox 관련 수정 완료
    */
  async updateAnswer(req, res) {
    const transaction = await db.sequelize.transaction();
    let changeData = req.body.data;

    const answer = await db["answer"].findOne({
      where: { id: req.body.answerId },
    });

    if (answer === null) {
      res.status(400).send({
        message: "invalid acess(answer not exist)",
      });
      return;
    }

    const form = await db["form"].findOne({
      where: { id: answer.dataValues.formId },
    });

    if (form === null) {
      res.status(400).send({
        message: "invalid acess(form not exist)",
      });
      return;
    }

    const formContent = await db["formContent"].findAll({
      where: { formId: form.dataValues.id },
    });

    for (let val of changeData) {
      let formContentId = val.formContentId;

      let find = await formContent.find(
        (item) => item.dataValues.id === formContentId
      );

      if (!find) {
        res.status(400).send({
          message: "invalid acess(formContent not exist)",
        });
        return;
      }

      delete val.formContentId;

      if (val.row && val.col) {
        val.answer = val.row + "." + val.col;
      }
      try {
        await db["answer"].update(
          {
            formId: form.dataValues.id,
            updatedAt: new Date(),
          },
          { where: { id: req.body.answerId } },
          { transaction }
        );
        if (val.formOptionIds) {
          await db["answerList"].destroy(
            {
              where: [{ formContentId }],
            },
            { transaction }
          );
          let append = val.formOptionIds.map((num) => {
            return {
              formOptionId: num,
              formContentId,
              answerId: req.body.answerId,
            };
          });
          await db["answerList"].bulkCreate(append, { transaction });
        } else {
          await db["answerList"].update(
            val,
            {
              where: [{ formContentId }],
            },
            { transaction }
          );
        }
      } catch (err) {
        console.log(err);
        res.status(400).send({
          message: "database err",
          code: err,
        });
        return;
      }
    }
    await transaction.commit();
    res.status(201).send({
      message: "ok",
    });
  },

  /*
        설문 내역 삭제
    */
  async deleteAnswer(req, res) {
    let id = req.params.id;

    if (!id) {
      res.status(400).send({
        message: "formId not received",
      });
    }

    await db["answer"].destroy({
      where: [{ id }],
    });
    // .then(result => {
    //     db['answerList'].destroy({
    //         where:[
    //             {
    //                 'answerId':id
    //             }
    //         ]
    //     });
    // });

    res.status(200).send({
      message: "ok",
    });
  },
};

function deleteNullContent(el) {
  if (el.dataValues.formOption === null) delete el.dataValues.formOption;
  if (el.dataValues.formOptionId === null) delete el.dataValues.formOptionId;
  if (el.dataValues.answer === null) delete el.dataValues.answer;
  if (el.dataValues.formGridId === null) delete el.dataValues.formGridId;
  if (el.dataValues.formGrid === null) delete el.dataValues.formGrid;
}
