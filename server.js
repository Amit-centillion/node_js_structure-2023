const express = require("express");
require("./src/config/dbConnection");
const { ENV_CCONST } = require("./src/constants/envVariable");

const userRoutes = require("./src/routes");
const app = express();

app.use(express.json());
app.use("/api/v1", userRoutes);

const HOST = process.env.HOST || "localhost";
const BASE_API_URL = `http://${HOST}:${ENV_CCONST.SERVER.PORT}/api/v1/`;

app.listen(ENV_CCONST.SERVER.PORT || 3002, () => {
  console.info("API Running at");
  console.info(`${"\tLocalhost:"} ${BASE_API_URL}`);
});
