const { DataTypes } = require('sequelize');
const sequelize = require('../database');
const User = require('./user');
const Column = require('./column');

const Task = sequelize.define('Task', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'Not Started',
  },
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  UserId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Users', // Make sure this matches the actual table name of your User model
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  },
  ColumnId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

});

Task.belongsTo(User);
Task.belongsTo(Column);


module.exports = Task;