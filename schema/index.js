// import type helpers from graphql-js
const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull
} = require("graphql");

const UserType = require("./types/user");

// The root query type is where in the data graph
// we can start asking questions
const RootQueryType = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    me: {
      type: UserType,
      description: "The current user identified by an api key",
      args: {
        key: { type: new GraphQLNonNull(GraphQLString) }
      },
      // 3rd arg is the value passed in lib/index.js context prop for express-graphql middleware
      resolve: (obj, args, { loaders }) => {
        // connect to pg
        // use args.key as the api key
        // pgPool
        // return pgdb(pgPool).getUserByApiKey(args.key);

        // Nevermind that
        // Dataloaders woo
        return loaders.usersByApiKeys.load(args.key);
      }
    }
  }
});

const ncSchema = new GraphQLSchema({
  query: RootQueryType
  // mutations:
});

module.exports = ncSchema;
