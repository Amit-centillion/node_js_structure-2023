import express, { json } from "express";
import "./src/config/dbConnection";
import { greenBright, cyanBright } from "chalk";
const app = express();
const cors = require("cors");
// import { cors } from "cros";
import { ENV } from "./src/constants";

import routes from "./src/index";

const {
  SERVER: { PORT },
} = ENV;

// server.use(cors("*"));
// const server = express();
app.use(json());
app.use(cors());

app.use("/api/v1", routes);

const HOST = process.env.HOST || "localhost";

const BASE_API_URL = `http://${HOST}:${PORT}/api/v1/`;

app.listen(PORT || 3002, () => {
  console.info(cyanBright("API Running at"));
  console.info(cyanBright(`${greenBright("\tLocalhost:")} ${BASE_API_URL}`));
});
