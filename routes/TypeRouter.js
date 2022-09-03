const express = require("express");

const router = express.Router();

const typeController = require("../controllers/TypeController");

router.get("/types",typeController.GetTypesList);
router.get("/create-types", typeController.GetCreateTypes);
router.post("/create-types", typeController.PostCreateTypes);
router.get("/edit-types/:typesId", typeController.GetEditTypes);
router.post("/edit-types", typeController.PostEditTypes);
router.post("/delete-types", typeController.PostDeleteTypes);

module.exports = router;