const config = require("../config");
const { MongoClient, ObjectID } = require("mongodb");

const USER = encodeURIComponent(config.dbUser);
const DB_PASSWORD = encodeURIComponent(config.dbPassword);
const DB_NAME = encodeURIComponent(config.dbName);
const DB_HOST = encodeURIComponent(config.dbHost);


const MONGO_URI = `mongodb+srv://${USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}?retryWrites=true&w=majority`;
console.log("MONGO URI", MONGO_URI);

class MongoLib {
  constructor() {
    this.client = new MongoClient(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    this.dbName = DB_NAME;
  }

  connect() {
    if (!MongoLib.connection) {
      MongoLib.connection = new Promise((resolve, reject) => {
        this.client.connect((error) => {
          if (error) {
            reject(error);
          }
          resolve(this.client.db(this.dbName));
        });
      });
    }

    return MongoLib.connection;
  }

  async findByQuery(collection, query) {
    const db = await this.connect();
    return await db.collection(collection).find(query).toArray();
  }

  async findById(collection, id) {
    const db = await this.connect();
    return await db.collection(collection).findOne({ _id: ObjectId(id) });
  }

  async createOne(collection, data) {
    const db = await this.connect();
    const resultData = await db.collection(collection).insertOne(data);
    return resultData.insertedId;
  }

  async updateOneById(collection, id, data) {
    const db = await this.connect();
    const resultData = await db
      .collection(collection)
      .updateOne({ _id: ObjectId(id) }, { $set: data }, { upsert: true });
    return resultData.upsertedId || id;
  }

  async deleteOneById(collection, id) {
    const db = await this.connect();
    await db.collection(collection).deleteOne({ _id: ObjectId(id) });
    return id;
  }
}

module.exports = MongoLib;
