const express = require("express");
const { update, index } = require("../controller/user.controller");
const router = express.Router();

router.post("/create", update);
router.get("/index", index);

module.exports = router;
