const Type = require("../models/Type");

exports.GetTypesList = (req, res, next) => {
    Type.findAll()
    .then((result) => {
      const types = result.map((result) => result.dataValues);

      res.render("types/list-types", {
        pageTitle: "Types",
        typesActive: true,
        types: types,
        hasTypes: types.length > 0,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.GetCreateTypes = (req, res, next) => {
  res.render("types/sv-up-types", {
    pageTitle: "Create types",
    typesActive: true,
    editMode: false,
  });
};

exports.PostCreateTypes = (req, res, next) => {
  const typeName = req.body.Name;

  Type.create({ name: typeName })
    .then((result) => {
      res.redirect("/types");
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.GetEditTypes = (req, res, next) => {
  const edit = req.query.edit;
  const typeId = req.params.typesId;

  if (!edit) {
    return res.redirect("/types");
  }

  Type.findOne({ where: { id: typeId } })
    .then((result) => {
      const type = result.dataValues;

      if (!type) {
        return res.redirect("/types");
      }
      res.render("types/sv-up-types", {
        pageTitle: "Edit types",
        typesActive: true,
        editMode: edit,
        type: type,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.PostEditTypes = (req, res, next) => {
  const typeName = req.body.Name; 
  const typeId = req.body.typeId;

  Type.update({ name: typeName }, { where: { id: typeId } })
    .then((result) => {
      return res.redirect("/types");
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.PostDeleteTypes = (req, res, next) => {
  const typeId = req.body.typesId;

  Type.destroy({ where: { id: typeId } })
    .then((result) => {
      return res.redirect("/types");
    })
    .catch((err) => {
      console.log(err);
    });
};