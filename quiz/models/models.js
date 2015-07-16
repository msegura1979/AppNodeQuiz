//Este fichero define como se construye el modelo 
var path = require('path');
//Postgres DATABASE_URL postgres://pafjgbzwptoouf:tXV1OtRc8bBACdr-OoT-1I5qU0@ec2-54-235-145-226.compute-1.amazonaws.com:5432/de6qbjo22i07ri
var url = process.env.DATABASE_URL.match(/(.*)\:\/\/(.*?)\:(.*)@(.*)\:(.*)\/(.*)/);
var DB_name = (url[6] || null);
var user = (url[2] || null);
var pwd = (url[3] || null);
var protocol = (url[1] || null);
var dialect = (url[1] || null);
var port = (url[5] || null);
var host = (url[4] || null);
var storage = process.env.DATABASE_STORAGE;

//Cargamos el Modelo ORM
var Sequelize = require('sequelize');
//Usar BBDD Sqlite
//dialect = es el dialecto de comunicacion con la base de datos
//storage = es el fichero donde se guardan los datos
var sequelize = new Sequelize(DB_name,user,pwd,
                             {dialect:protocol, 
                              storage:protocol,
                              port:port,
                              host:host,
                              storage:storage, //solo sqlite .env
                              omitNull:true}); //solo Postgree

//Importar la definicion de la tabla Quiz en quiz.js
var quiz_path = path.join(__dirname,'quiz');
var Quiz = sequelize.import(quiz_path);
export.Quiz = Quiz;//exportar definicion de la tabla quiz

//sequelize.sync() crea e inicializa tabla de preguntas en BD
sequelize.sync().then(function(){//success ejecuta el manejador una vez creada la tabla y sync sincroniza la tabla
    Quiz.count().then(function(count){//quiz.count nos dice el numero de filas de la tabla
        if(count === 0){
        Quiz.create({pregunta: 'Capital de Italia', respuesta: 'Roma'}).then(function(){
        console.log('Base de datos inicializada')});
        };
    }); 
});
