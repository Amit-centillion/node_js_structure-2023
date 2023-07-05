const express = require("express");
const { update } = require("../controller/test-api.controller");
const router = express.Router();

router.post("/testApiCall", update);

module.exports = router;
