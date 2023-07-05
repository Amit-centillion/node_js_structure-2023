const { set, connect, connection } = require("mongoose");
const { ENV } = require("../constants");
const { ENV_CCONST } = require("../constants/envVariable");

const connectMongoDB = async () => {
  try {
    connect(ENV_CCONST.DATABASE.MONGO_URI, {
      useNewUrlParser: true,
    });

    const db = connection;

    db.on("disconnected", (_err) => {
      console.error(
        `MongoDB-> disconnected: ${ENV_CCONST.DATABASE.MONGO_DB_NAME}`
      );
      connectMongoDB();
    });

    db.on("reconnected", (_err) => {
      console.log(
        `MongoDB-> reconnected: ${ENV_CCONST.DATABASE.MONGO_DB_NAME}`
      );
    });

    db.on("error", (error) => {
      console.info((`Error occurred in db connection", error`, erro));
    });

    db.on("open", () => {
      console.info(`DB Connection with established successfully.`);
      console.log("=============================================");
    });
  } catch (error) {
    console.log("Error occurred in db connection", error);
    process.exit(-1);
  }
};

connectMongoDB();

module.exports = {
  connectMongoDB,
};
