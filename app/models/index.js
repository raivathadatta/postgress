
const Sequelize = require('sequelize');
const env = 'development';
const config = require("../config/config.json")[env];

const sequelize = new Sequelize(config.database, config.username, config.password, config);

const db = {}
db['employees'] = require('./employees.model.js')(sequelize, Sequelize.DataTypes)
db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
