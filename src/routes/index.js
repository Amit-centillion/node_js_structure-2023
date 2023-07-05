const express = require("express");
const test = require("./test-api.route");

const router = express.Router();
router.use("/test", test);

module.exports = router;
