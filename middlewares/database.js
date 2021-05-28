import { MongoClient } from "mongodb";

global.mongo = global.mongo || {};

let indexesCreated = false;
export async function createIndexes(db) {
  await Promise.all([
    db
      .collection("tokens")
      .createIndex({ expireAt: -1 }, { expireAfterSeconds: 0 }),
    db.collection("users").createIndex({ email: 1 }, { unique: true }),
  ]);
  indexesCreated = true;
}

export default async function database(req, res, next) {
  if (!global.mongo.client) {
    global.mongo.client = new MongoClient(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    await global.mongo.client.connect();
  }
  req.dbClient = global.mongo.client;
  req.db = global.mongo.client.db(process.env.DB_NAME);
  if (!indexesCreated) await createIndexes(req.db);
  return next();
}
