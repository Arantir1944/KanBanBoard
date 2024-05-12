const { DataTypes } = require('sequelize');
const sequelize = require('../database');
const passportLocalSequelize = require('passport-local-sequelize');
var crypto = require('crypto');

const User = sequelize.define('User', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  FirstName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  LastName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  Email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  salt: {
    type: DataTypes.STRING,
  }

});

User.prototype.validPassword = function (password) {
  const hash = crypto.pbkdf2Sync(password, this.salt, 100000, 64, 'sha512').toString('hex');
  return this.password === hash;
};

passportLocalSequelize.attachToUser(User, {
  usernameField: 'username',
});

module.exports = User;
