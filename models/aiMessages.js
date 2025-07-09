const sequelize = require('../db');
const { DataTypes } = require('sequelize');

const AiMessages = sequelize.define(
  'ai_messages',
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    userMessage: { type: DataTypes.ARRAY(DataTypes.STRING), allowNull: false },
    aiResponse: { type: DataTypes.ARRAY(DataTypes.STRING), allowNull: false },
  },
  {
    timestamps: false,
    tableName: 'ai_messages',
  }
);

module.exports = AiMessages;
