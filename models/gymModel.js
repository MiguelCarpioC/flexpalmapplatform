const sequelize = require('../db');
const { DataTypes } = require('sequelize');

const Gym = sequelize.define(
  'gyms',
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    location: { type: DataTypes.JSON, allowNull: false }, // [{ latitude, longitude }]
    facilities: { type: DataTypes.ARRAY(DataTypes.STRING), allowNull: true },
    photo: { type: DataTypes.STRING, allowNull: true },
    coaches: { type: DataTypes.ARRAY(DataTypes.INTEGER), allowNull: true },
    description: { type: DataTypes.TEXT, allowNull: true },
    users: { type: DataTypes.ARRAY(DataTypes.INTEGER), allowNull: true },
  },
  {
    timestamps: false,
    tableName: 'gyms',
  }
);

module.exports = Gym;
