const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLList
} = require("graphql");

const mdb = require("../../database/mdb");

const ContestType = require("./contest");

module.exports = new GraphQLObjectType({
  name: "UserType",
  fields: {
    id: { type: GraphQLID },
    email: { type: new GraphQLNonNull(GraphQLString) },
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    createdAt: { type: GraphQLString },
    contests: {
      type: new GraphQLList(ContestType),
      resolve: (obj, args, { loaders }) => {
        // return pgdb(pgPool).getContests(obj);
        return loaders.contestsForUserIds.load(obj.id);
      }
    },
    contestsCount: {
      type: GraphQLInt,
      resolve: (obj, args, { loaders }, { fieldName }) =>
        loaders.mdb.usersByIds.load(obj.id).then(res => res[fieldName])
    },
    namesCount: {
      type: GraphQLInt,
      resolve: (obj, args, { loaders }, { fieldName }) =>
        loaders.mdb.usersByIds.load(obj.id).then(res => res[fieldName])
    },
    votesCount: {
      type: GraphQLInt,
      resolve: (obj, args, { loaders }, { fieldName }) =>
        loaders.mdb.usersByIds.load(obj.id).then(res => res[fieldName])
    }
  }
});
