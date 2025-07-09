const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const cors = require('cors');
const schema = require('./schema');
const sequelize = require('./db');
require('dotenv').config();
const app = express();
// Middleware para manejar CORS
app.use(cors({
  origin: ['https://healthandfit-458fd.web.app', 'http://localhost:5173'],
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));
app.use(express.json()); // Habilita JSON en requests
/// Middleware de autenticación
// Middleware GraphQL con autenticación
app.use('/graphql', graphqlHTTP({
  schema, // Debe ser un objeto GraphQLSchema
  graphiql: true,
}));

// Conectar a la base de datos y arrancar el servidor
app.listen(4000, () => {
  console.log('Servidor GraphQL en http://localhost:4000/graphql');
});