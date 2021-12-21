const answer = require("../../models/answer");
const db = require("../../models/index");

module.exports = {
  /*
        설문 작성
    */
  async create(req, res) {
    let userEmail = req.params.email;
    let formId = req.body.formId;
    let data = req.body.data;
    let i = 0;
    for (let val of data) {
      if (!val.answer && !val.formOptionId && (!val.row || !val.col)) {
        res.status(400).send({
          message: "data not received",
        });
        return;
      }
      if (val.row && val.col) {
        data[i].answer = val.row + "." + val.col;
        delete data[i].row, data[i].col;
      }
      i++;
    }
    let find = await db["form"].findOne({ where: [{ id: formId }] });
    if (!find)
      res.status(400).send({
        message: "form not exist",
      });
    db["answer"]
      .findOne({
        where: [{ userEmail }, { formId }],
      })
      .then(async (result) => {
        if (result !== null) {
          await res.status(400).send({
            message: "aleady writed this form",
          });
          return;
        } else {
          db["answer"]
            .create({
              userEmail,
              formId,
            })
            .then(async (result) => {
              let values = result.dataValues;

              data.sort((a, b) => a.formContentId - b.formContentId);

              for (let val of data) {
                val.answerId = values.id;
                await db["answerList"].create(val);
              }
              res.status(201).send({
                message: "ok",
              });
            });
        }
      });
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
                console.log(answer);
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

        res.status(200).send({
          data: {
            value: values,
            statistics,
          },
          message: "ok",
        });
      });
  },

  /*
        설문 내역 업데이트 - checkbox 관련 수정 완료
    */
  async updateAnswer(req, res) {
    let changeData = req.body.data;
    for (let val of changeData) {
      let formContentId = val.formContentId;
      delete val.formContentId;
      if (val.row && val.col) val.answer = val.row + "." + val.col;
      if (val.formOptionIds) {
        await db["answerList"].destroy({
          where: [{ formContentId }],
        });
        let append = val.formOptionIds.map((num) => {
          return {
            formOptionId: num,
            formContentId,
            answerId: req.body.answerId,
          };
        });
        await db["answerList"].bulkCreate(append);
      } else {
        await db["answerList"].update(val, {
          where: [{ formContentId }],
        });
      }
    }

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
