import express from "express";
import testApi from "../controller/test-api.controller"

const router = express.Router();

router.post("/testApiCall",testApi.update);

module.exports = router;
