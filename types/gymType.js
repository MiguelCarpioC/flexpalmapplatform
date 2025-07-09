const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLNonNull, GraphQLList, GraphQLFloat } = require('graphql');

const LocationType = new GraphQLObjectType({
  name: 'Location',
  fields: () => ({
    latitude: { type: new GraphQLNonNull(GraphQLFloat) },
    longitude: { type: new GraphQLNonNull(GraphQLFloat) },
  }),
});

const GymType = new GraphQLObjectType({
  name: 'Gym',
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLInt) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    location: { type: new GraphQLList(LocationType) },
    facilities: { type: new GraphQLList(GraphQLString) },
    photo: { type: GraphQLString },
    coaches: { type: new GraphQLList(GraphQLInt) },
    description: { type: GraphQLString },
    users: { type: new GraphQLList(GraphQLInt) },
  }),
});

module.exports = GymType;
