// import type helpers from graphql-js
const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull
} = require("graphql");

const pgdb = require("../database/pgdb");
const MeType = require("./types/me");

// The root query type is where in the data graph
// we can start asking questions
const RootQueryType = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    me: {
      type: MeType,
      description: "The current user identified by an api key",
      args: {
        key: { type: new GraphQLNonNull(GraphQLString) }
      },
      // 3rd arg is the value passed in lib/index.js context prop for express-graphql middleware
      resolve: (obj, args, { pgPool }) => {
        // connect to pg
        // use args.key as the api key
        // pgPool
        return pgdb(pgPool).getUser(args.key);
      }
    }
  }
});

const ncSchema = new GraphQLSchema({
  query: RootQueryType
  // mutations:
});

module.exports = ncSchema;
