var path = require('path');


//Postgres DATABASE_URL = postgres://user:/passwd@host:port/database
//SQlite DATABASE_URL = sqlite://:@/
var url = process.env.DATABASE_URL.match(/(.*)\:\/\/(.*?)\:(.*)@(.*)\:(.*)\/(.*)/);
//var url = process.env.DATABASE_URL.match(/(.*)\:\/\/(.*?)\:(.*)@(.*)\:(.*)\/(.*)/);
var DB_name = (url[6]||null);
var user    = (url[2]||null);
var pwd     = (url[3]||null);
var protocol = (url[1]||null);
var dialect = (url[1]||null);
var port    = (url[5]||null);
var host    = (url[4]||null);
var storage = process.env.DATABASE_STORAGE;

//cargar Modelo ORM
var Sequelize = require ('sequelize');

//Usar BBDD SQlite o Postgres

var sequelize = new Sequelize(DB_name,user,pwd,
                    { dialect: protocol,
                      protocol:protocol,
                      port: port,
                      host: host,
                      storage: storage, //solo SQlite(.env)
                      omitNull: true    //solo Postgress
                  }


                    );

//Importar la definicion de la tabla Quiz
var Quiz = sequelize.import(path.join(__dirname, 'quiz'));

/*
//cargar Modelo ORM
var Sequelize = require ('sequelize');

//Usar BBDD SQlite:
var sequelize = new Sequelize(null,null,null,
                    {dialect: "sqlite",storage : "quiz.sqlite"}
                    );
*/

// Importar definicion de la tabla Comment
var comment_path = path.join(__dirname,'comment');
var Comment = sequelize.import(comment_path);

Comment.belongsTo(Quiz);
Quiz.hasMany(Comment);


exports.Quiz = Quiz;//exportar definicion de tabla Quiz;
exports.Comment = Comment;

//sequelize.sync() crea e inicializa tabla de preguntas en DB
sequelize.sync().then(function(){
  //then(..) ejecuta el manejador una vez creada la tabla
  Quiz.count().then(function(count){

    if(count === 0){ //la tabla solo se inicializa si esta vacia
      Quiz.create({ pregunta: 'Capital de Italia',
                    respuesta: 'Roma', tema: 'Humanidades'
      });
	Quiz.create({ pregunta: 'Capital de Portugal',
                    respuesta: 'Lisboa',  tema: 'Humanidades'
      })
	 .then(function(){console.log('Base de datos inicializada')});
};
    
    });
});

