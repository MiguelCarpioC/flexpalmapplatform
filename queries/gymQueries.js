const { GraphQLList, GraphQLInt } = require('graphql');
const GymType = require('../types/gymType');
const Gym = require('../models/gymModel');

const gymQueries = {
  // Obtener todos los gyms
  allGyms: {
    type: new GraphQLList(GymType),
    resolve: async () => {
      return await Gym.findAll();
    },
  },

  // Obtener gym por ID
  gymById: {
    type: GymType,
    args: {
      id: { type: GraphQLInt },
    },
    resolve: async (_, { id }) => {
      return await Gym.findByPk(id);
    },
  },
};

module.exports = gymQueries;
