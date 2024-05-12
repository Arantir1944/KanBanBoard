// models/Column.js
const { DataTypes } = require('sequelize');
const sequelize = require('../database');
const User = require('./user');

const Column = sequelize.define('Column', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  UserId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

Column.belongsTo(User);

module.exports = Column;