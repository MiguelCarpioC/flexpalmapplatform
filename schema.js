const { GraphQLSchema, GraphQLObjectType } = require('graphql');

const gymQueries = require('./queries/gymQueries');
const aiMessagesQueries = require('./queries/aiMessagesQueries');
const apiKeysQueries = require('./queries/apiKeysQueries');
const gymMutations = require('./mutations/gymMutations');
const aiMessagesMutations = require('./mutations/aiMessagesMutations');

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    ...gymQueries,
    ...aiMessagesQueries,
    ...apiKeysQueries,
  },
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    ...gymMutations,
    ...aiMessagesMutations,
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
