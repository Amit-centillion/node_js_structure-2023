const express = require("express");
const {
  registration,
  index,
  login,
  forgot,
  verifyEmail,
} = require("../controller/user.controller");
const { validate, auth_schema } = require("../utils/validation");

const router = express.Router();

router.post("/register", [validate(auth_schema.register)], registration);
router.get("/index", index);
router.post("/login", [validate(auth_schema.auth)], login);
router.post("/forgot", [validate(auth_schema.forgot)], forgot);
router.post("/verifyEmail", verifyEmail);

module.exports = router;
