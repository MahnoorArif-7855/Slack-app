require("dotenv").config();
const express = require("express");

const { MongoClient, ServerApiVersion } = require("mongodb");

const PORT = 6969;
const { App, LogLevel } = require("@slack/bolt");

const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(process.env.DB_URI);

const app = express();
app.use(express.json());
const { registerListeners } = require("./listeners");

let logLevel;
switch (process.env.LOG_LEVEL) {
  case "debug":
    logLevel = LogLevel.DEBUG;
    break;
  case "info":
    logLevel = LogLevel.INFO;
    break;
  case "warn":
    logLevel = LogLevel.WARN;
    break;
  case "error":
    logLevel = LogLevel.ERROR;
    break;
  default:
    logLevel = LogLevel.INFO;
}

const uri =
  "mongodb+srv://Mahnoor:MongoDb-3282@cluster.poufqwo.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});
client.connect();

const feedbackdb = client.db("Feedback");

// Initializes your sqlApp with your bot token and signing secret
const sqlApp = new App({
  token: process.env.SLACK_BOT_TOKEN,
  socketMode: true,
  appToken: process.env.SLACK_APP_TOKEN,
  logLevel,
});
registerListeners(sqlApp);
app.get("/feedback", async (req, res) => {
  const collection = await feedbackdb.collection("user-feedbacks");
  const results = await collection.find({}).limit(50).toArray();
  console.log("results", results);

  res.send(results).status(200);
});

(async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ force: true });
    // eslint-disable-next-line no-console
    console.log("All models were synchronized successfully.");
    // eslint-disable-next-line no-console
    console.log("Connection has been established successfully.");
    // Start your sqlApp
    await sqlApp.start();
    app.listen(PORT, () => {
      console.log("Server running");
    });

    // eslint-disable-next-line no-console
    console.log("⚡️ Feedback App sqlApp is running!");
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Unable to start App", error);
    process.exit(1);
  }
})();
