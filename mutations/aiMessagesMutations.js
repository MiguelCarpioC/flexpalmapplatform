const { GraphQLNonNull, GraphQLString, GraphQLList, GraphQLInt } = require('graphql');
const AiMessages = require('../models/aiMessages');
const AiMessagesType = require('../types/aiMessagesType');

const aiMessagesMutations = {
  // Crear un mensaje AI
  createAiMessage: {
    type: AiMessagesType,
    args: {
      userMessage: { type: new GraphQLNonNull(new GraphQLList(GraphQLString)) },
      aiResponse: { type: new GraphQLNonNull(new GraphQLList(GraphQLString)) },
    },
    resolve: (_, args) => {
      return AiMessages.create(args);
    },
  },

  // Actualizar un mensaje AI
  updateAiMessage: {
    type: AiMessagesType,
    args: {
      id: { type: new GraphQLNonNull(GraphQLInt) },
      userMessage: { type: new GraphQLList(GraphQLString) },
      aiResponse: { type: new GraphQLList(GraphQLString) },
    },
    resolve: async (_, { id, ...args }) => {
      try {
        const [rowsUpdated] = await AiMessages.update(args, { where: { id } });
        if (rowsUpdated === 0) {
          throw new Error(`Mensaje AI con ID ${id} no encontrado.`);
        }
        return await AiMessages.findByPk(id);
      } catch (error) {
        throw new Error(`Error al actualizar el mensaje AI: ${error.message}`);
      }
    },
  },

  // Eliminar un mensaje AI
  deleteAiMessage: {
    type: GraphQLString,
    args: {
      id: { type: new GraphQLNonNull(GraphQLInt) },
    },
    resolve: async (_, { id }) => {
      try {
        const rowsDeleted = await AiMessages.destroy({ where: { id } });
        if (rowsDeleted === 0) {
          throw new Error(`Mensaje AI con ID ${id} no encontrado.`);
        }
        return `Mensaje AI con ID ${id} eliminado con éxito.`;
      } catch (error) {
        throw new Error(`Error al eliminar el mensaje AI: ${error.message}`);
      }
    },
  },
};

module.exports = aiMessagesMutations;
