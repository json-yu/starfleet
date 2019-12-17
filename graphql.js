const mongoose = require('mongoose');
const fs = require('fs');
const typeDefs = fs.readFileSync('./graphqlsrc/models/gqlSDL.gql', 'utf8') // this path is for testing purpose and should be dynamic on fix.
const { Film } = require('./models/starWarsModels.js');
// const resolvers = require('./resolvers')
const MongoClient = require('mongodb').MongoClient;
const { ApolloServer, gql } = require("apollo-server-lambda");

const MONGODB_URI = 'mongodb+srv://chunkoftofu:chickenpotpie1@sense8cluster-v4ozn.mongodb.net/test';

// mongoose.connect('mongodb+srv://chunkoftofu:chickenpotpie1@sense8cluster-v4ozn.mongodb.net/test', { 
//     useNewUrlParser: true, 
//     useUnifiedTopology:	true, 
//     dbName: 'starwars' })
//   .then(() => console.log('MongoDB successfully connected'))
//   .catch( err => console.log('Error connecting to db: ', err));
  const resolvers = {
    Query: {
      FilmById: async (_, id) => {
        const film = await Film.findById(id);
        return film;
      },
    }
  }

  let cachedDb = null;

  function connectToDatabase (uri) {
    console.log('=> connect to database');
  
    if (cachedDb && cachedDb.serverConfig.isConnected()) {
      console.log('=> using cached database instance');
      return Promise.resolve(cachedDb);
    }
  
    return MongoClient.connect(uri)
      .then(db => {
        cachedDb = db;
        return cachedDb;
      });
  }

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ event, context }) => ({
    headers: event.headers,
    functionName: context.functionName,
    event,
    context
  }),
  introspection: true,
  playground: true
});

exports.graphqlHandler = server.createHandler((event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  console.log('event: ', event);

  connectToDatabase(MONGODB_URI)
    .then(result => {
      console.log('=> returning result: ', result);
      callback(null, result);
    })
    .then(() => {
      return { statusCode: 200, body: 'success' };
    })
    .catch( err => console.log('Error connecting to db: ', err));
  }
);