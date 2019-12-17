const mongoose = require('mongoose');
const { composeWithMongoose } = require('graphql-compose-mongoose');
const { schemaComposer } = require('graphql-compose');


const Schema = mongoose.Schema;

const filmSchema = new Schema({
	title: String,
	episode_id: Number,
	opening_crawl: String,
	director: String,
	producer: String,
	release_date: Date
  });
  
const Film = mongoose.model('film', filmSchema);

const customizationOptions = {}; // left it empty for simplicity, described below
const FilmTC = composeWithMongoose(Film, customizationOptions);

// STEP 3: Add needed CRUD film operations to the GraphQL Schema
// via graphql-compose it will be much much easier, with less typing
schemaComposer.Query.addFields({
  filmById: FilmTC.getResolver('findById'),
  filmByIds: FilmTC.getResolver('findByIds'),
  filmOne: FilmTC.getResolver('findOne'),
  filmMany: FilmTC.getResolver('findMany'),
  filmCount: FilmTC.getResolver('count'),
  filmConnection: FilmTC.getResolver('connection'),
  filmPagination: FilmTC.getResolver('pagination'),
});

schemaComposer.Mutation.addFields({
  filmCreateOne: FilmTC.getResolver('createOne'),
  filmCreateMany: FilmTC.getResolver('createMany'),
  filmUpdateById: FilmTC.getResolver('updateById'),
  filmUpdateOne: FilmTC.getResolver('updateOne'),
  filmUpdateMany: FilmTC.getResolver('updateMany'),
  filmRemoveById: FilmTC.getResolver('removeById'),
  filmRemoveOne: FilmTC.getResolver('removeOne'),
  filmRemoveMany: FilmTC.getResolver('removeMany'),
});

const graphqlSchema = schemaComposer.buildSchema();

module.exports = graphqlSchema;