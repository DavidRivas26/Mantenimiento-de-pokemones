const Region = require("../models/Region");

exports.GetRegionsList = (req, res, next) => {
  Region.findAll()
    .then((result) => {
      const regions = result.map((result) => result.dataValues);

      res.render("regions/list-regions", {
        pageTitle: "Regions",
        regionsActive: true,
        regions: regions,
        hasRegions: regions.length > 0,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.GetCreateRegions = (req, res, next) => {
  res.render("regions/sv-up-regions", {
    pageTitle: "Create regions",
    regionsActive: true,
    editMode: false,
  });
};

exports.PostCreateRegions = (req, res, next) => {
  const regionName = req.body.Name;

  Region.create({ name: regionName })
    .then((result) => {
      res.redirect("/regions");
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.GetEditRegions = (req, res, next) => {
  const edit = req.query.edit;
  const regionId = req.params.regionsId;

  if (!edit) {
    return res.redirect("/regions");
  }

  Region.findOne({ where: { id: regionId } })
    .then((result) => {
      const region = result.dataValues;

      if (!region) {
        return res.redirect("/regions");
      }
      res.render("regions/sv-up-regions", {
        pageTitle: "Edit regions",
        regionsActive: true,
        editMode: edit,
        region: region,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.PostEditRegions = (req, res, next) => {
  const regionName = req.body.Name; 
  const regionId = req.body.regionId;

  Region.update({ name: regionName }, { where: { id: regionId } })
    .then((result) => {
      return res.redirect("/regions");
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.PostDeleteRegions = (req, res, next) => {
  const regionId = req.body.regionsId;

  Region.destroy({ where: { id: regionId } })
    .then((result) => {
      return res.redirect("/regions");
    })
    .catch((err) => {
      console.log(err);
    });
};