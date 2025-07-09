const { GraphQLList, GraphQLInt } = require('graphql');
const AiMessagesType = require('../types/aiMessagesType');
const AiMessages = require('../models/aiMessages');

const aiMessagesQueries = {
  // Obtener todos los mensajes AI
  allAiMessages: {
    type: new GraphQLList(AiMessagesType),
    resolve: async () => {
      return await AiMessages.findAll();
    },
  },

  // Obtener mensaje AI por ID
  aiMessageById: {
    type: AiMessagesType,
    args: {
      id: { type: GraphQLInt },
    },
    resolve: async (_, { id }) => {
      return await AiMessages.findByPk(id);
    },
  },
};

module.exports = aiMessagesQueries;
