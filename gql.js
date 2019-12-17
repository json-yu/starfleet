const { ApolloServer } = require("apollo-server-lambda");
const fs = require('fs');
const typeDefs = fs.readFileSync('./graphqlsrc/models/gqlSDL.gql', 'utf8')
const resolvers = require("./resolvers.js");
const connectToMongoDB = require("./db.js");

exports.handler = async function(event, context) {
  const db = await connectToMongoDB();
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });
  return new Promise((yay, nay) => {
    const cb = (err, args) => (err ? nay(err) : yay(args));
    server.createHandler()(event, context, cb);
  });
};