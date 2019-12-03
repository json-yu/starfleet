#!/usr/bin/env node

/*
 
const fs = require('fs');
const composeWithMongoose = require('graphql-compose-mongoose').composeWithMongoose;
const schemaComposer = require('graphql-compose').schemaComposer;
const schemaFile = require(`../${process.argv[2]}`)
const printSchema = require('graphql').printSchema;

let graphqlSchema

for (let key in schemaFile) {
    const customizationOptions = {};
    const schemaToGraphQL = composeWithMongoose(schemaFile[key], customizationOptions);

    schemaComposer.Query.addFields({
        speciesById: schemaToGraphQL.getResolver('findById'),
        speciesByIds: schemaToGraphQL.getResolver('findByIds'),
        speciesOne: schemaToGraphQL.getResolver('findOne'),
        speciesMany: schemaToGraphQL.getResolver('findMany'),
        speciesCount: schemaToGraphQL.getResolver('count'),
        speciesConnection: schemaToGraphQL.getResolver('connection'),
        speciesPagination: schemaToGraphQL.getResolver('pagination'),
    });
    schemaComposer.Mutation.addFields({
        speciesCreateOne: schemaToGraphQL.getResolver('createOne'),
        speciesCreateMany: schemaToGraphQL.getResolver('createMany'),
        speciesUpdateById: schemaToGraphQL.getResolver('updateById'),
        speciesUpdateOne: schemaToGraphQL.getResolver('updateOne'),
        speciesUpdateMany: schemaToGraphQL.getResolver('updateMany'),
        speciesRemoveById: schemaToGraphQL.getResolver('removeById'),
        speciesRemoveOne: schemaToGraphQL.getResolver('removeOne'),
        speciesRemoveMany: schemaToGraphQL.getResolver('removeMany'),
    });

    const graphqlSchema = schemaComposer.buildSchema();
    // console.log(schemaToGraphQL._gqcFields);
    // console.log(schemaToGraphQL.getResolver('findById').getFieldConfig());
    // console.log(schemaToGraphQL.getResolver('createOne').getFieldConfig());
    // console.log(printSchema(graphqlSchema));
}

<<<<<<< HEAD
=======
run();

*/

const program = require('commander');
const fs = require('fs');
const path = require('path');

// Metadata
const { version } = require('../package.json');
const { description } = require('../package.json');

// Subcommands
const createGQL = require('./createGQL');

// Temp
const Book = require('../models/Book');

program
  .version(version)
  .description(description)

// starfleet init
// add creating folder structure before parsing
program
  .command('initialize')
  .alias('init')
  .description('Initializing GraphQL services')
  .action(file => {

    // change this to be user inputted; with default being models
	const workdir = 'models';

	fs.readdirSync('./' + workdir).forEach(file => {
	  const filename = path.parse(file).name;
	  const model = require('../' + workdir + '/' + file);
	  createGQL(model, filename);
	});
  });

// starfleet deploy (flags)
program
    .command('deploy')
    .option('--d, --deploy <type>', 'specify where to deploy', 'docker')
    .action()


program.parse(process.argv);
>>>>>>> master
