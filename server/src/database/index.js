const Sequelize = require('sequelize');
const dbConfig = require('../config/database');
const Usuario = require('../models/Usuario');
const Item = require('../models/Item');
const Point = require('../models/Point');
const Point_Item = require('../models/Point_Item');
const connection = new Sequelize(dbConfig);



Usuario.init(connection);
Point.init(connection);
Item.init(connection);
Point_Item.init(connection);

Point.associate(connection.models);
Item.associate(connection.models);


module.exports = connection;