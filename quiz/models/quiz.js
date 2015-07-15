 var path = require('path');
//Cargamos el Modelo ORM
var Sequelize = require('sequelize');
//Usar BBDD Sqlite
var sequelize = new Sequelize(null,null,null,
                             {dialect:"sqlite", storage: "quiz.sqlite"})