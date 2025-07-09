const { GraphQLNonNull, GraphQLString, GraphQLList, GraphQLInt, GraphQLFloat } = require('graphql');
const Gym = require('../models/gymModel');
const GymType = require('../types/gymType');

const gymMutations = {
  // Crear un gimnasio
  createGym: {
    type: GymType,
    args: {
      name: { type: new GraphQLNonNull(GraphQLString) },
      location: { type: new GraphQLNonNull(new GraphQLList(
        new (require('graphql')).GraphQLInputObjectType({
          name: 'LocationInput',
          fields: {
            latitude: { type: new GraphQLNonNull(GraphQLFloat) },
            longitude: { type: new GraphQLNonNull(GraphQLFloat) },
          },
        })
      )) },
      facilities: { type: new GraphQLList(GraphQLString) },
      photo: { type: GraphQLString },
      coaches: { type: new GraphQLList(GraphQLInt) },
      description: { type: GraphQLString },
      users: { type: new GraphQLList(GraphQLInt) },
    },
    resolve: (_, args) => {
      // location se almacena como JSON en el modelo
      return Gym.create(args);
    },
  },

  // Actualizar un gimnasio
  updateGym: {
    type: GymType,
    args: {
      id: { type: new GraphQLNonNull(GraphQLInt) },
      name: { type: GraphQLString },
      location: { type: new GraphQLList(
        new (require('graphql')).GraphQLInputObjectType({
          name: 'LocationInputUpdate',
          fields: {
            latitude: { type: new GraphQLNonNull(GraphQLFloat) },
            longitude: { type: new GraphQLNonNull(GraphQLFloat) },
          },
        })
      ) },
      facilities: { type: new GraphQLList(GraphQLString) },
      photo: { type: GraphQLString },
      coaches: { type: new GraphQLList(GraphQLInt) },
      description: { type: GraphQLString },
      users: { type: new GraphQLList(GraphQLInt) },
    },
    resolve: async (_, { id, ...args }) => {
      try {
        const [rowsUpdated] = await Gym.update(args, { where: { id } });
        if (rowsUpdated === 0) {
          throw new Error(`Gimnasio con ID ${id} no encontrado.`);
        }
        return await Gym.findByPk(id);
      } catch (error) {
        throw new Error(`Error al actualizar el gimnasio: ${error.message}`);
      }
    },
  },

  // Eliminar un gimnasio
  deleteGym: {
    type: GraphQLString,
    args: {
      id: { type: new GraphQLNonNull(GraphQLInt) },
    },
    resolve: async (_, { id }) => {
      try {
        const rowsDeleted = await Gym.destroy({ where: { id } });
        if (rowsDeleted === 0) {
          throw new Error(`Gimnasio con ID ${id} no encontrado.`);
        }
        return `Gimnasio con ID ${id} eliminado con éxito.`;
      } catch (error) {
        throw new Error(`Error al eliminar el gimnasio: ${error.message}`);
      }
    },
  },
};

module.exports = gymMutations;
