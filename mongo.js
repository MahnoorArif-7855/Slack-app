/* eslint-disable no-underscore-dangle */
/* eslint-disable global-require */
const { createFeedbackDocument } = require("./listeners/views/new-task-modal");

async function findListings(client, resultsLimit) {
  const cursor = client
    .db("Feedback")
    .collection("user-feedbacks")
    .find()
    .limit(resultsLimit);

  const results = await cursor.toArray();
  if (results.length > 0) {
    console.log(`Found ${results.length} listing(s):`);
    results.forEach((result, i) => {
      //   const date = new Date(result.last_review).toDateString();

      console.log();
      console.log(`${i + 1}. feedback: ${result.feedback}`);
      console.log(`   id: ${result._id}`);
    });
  }
}
async function main() {
  const { MongoClient, ServerApiVersion } = require("mongodb");
  const uri =
    "mongodb+srv://Mahnoor:MongoDb-3282@cluster.poufqwo.mongodb.net/?retryWrites=true&w=majority";
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverApi: ServerApiVersion.v1,
  });
  await client.connect();
  findListings(client, 10);
  
  client.connect((err) => {
      const collection = client.db("test").collection("devices");
      createFeedbackDocument(collection);
    // perform actions on the collection object
    console.log("collection", collection);
    console.log("err", err.message);
    client.close();
  });
}
main().catch(console.error);
