const MongoClient = require("mongodb").MongoClient;
const URI = 'mongodb+srv://chunkoftofu:chickenpotpie1@sense8cluster-v4ozn.mongodb.net/test';
const DB_NAME = 'starwars';

let cachedDb = null;
module.exports = () => {
  if (cachedDb && cachedDb.serverConfig.isConnected()) {
    return Promise.resolve(cachedDb);
  }
  return MongoClient.connect(URI, { useNewUrlParser: true }).then(client => {
    cachedDb = client.db(DB_NAME);
    return cachedDb;
  });
};