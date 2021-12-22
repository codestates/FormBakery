module.exports = {
  getForm(req, res, db) {
    let id = req.params.id;
    db["form"]
      .findOne({
        where: { id },
        include: {
          model: db["formContent"],
          attributes: { exclude: ["createdAt", "updatedAt", "formId"] },
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
        order: [[db["formContent"], "order", "ASC"]],
      })
      .then((result) => {
        if (result === null) {
          res.status(400).send({
            message: "form not exist",
          });
        } else {
          let data = result.dataValues;

          data.formContents = data.formContents.map((t) => {
            if (t.formOptions.length === 0) delete t.dataValues.formOptions;
            if (t.formGrids.length === 0) delete t.dataValues.formGrids;
            if (t.content === null) delete t.dataValues.content;
            return t;
          });

          res.status(200).send({
            message: "ok",
            data,
          });
        }
      });
  },
};
