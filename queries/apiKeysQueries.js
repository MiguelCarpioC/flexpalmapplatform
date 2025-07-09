// apiKeysQueries.js
const { GraphQLObjectType, GraphQLString } = require('graphql');

const apiKeysQueries = {
  getGoogleApiKey: {
    type: GraphQLString,
    resolve: () => process.env.GOOGLE_API_KEY || null,
  },
  getGeminiApiKey: {
    type: GraphQLString,
    resolve: () => process.env.GEMINI_API_KEY || null,
  },
};

module.exports = apiKeysQueries;
