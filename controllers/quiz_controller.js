// Ahora lo hacemos a través del modelo concreto definido en models.js a través de Quiz
var models = require('../models/models.js');

// Autoload :id
exports.load = function(req, res, next, quizId) {
  models.Quiz.find(quizId).then(
    function(quiz) {
      if (quiz) {
        req.quiz = quiz;
        next();
      } else { next(new Error('No existe quizId=' + quizId)) }
    }
  ).catch(function(error) { next(error)});
};

// GET /quizes con listado de preguntas filtradas
exports.index = function(req, res) {
  // Si es la primera vez req.query.search será nulo o undefined, entonces lo colocamos a nulo,
  // sino formamos el nuevo argumento de la nueva query a realizar
  var miQueryArg= req.query.search ? "%" + req.query.search.replace(/ +/g, "%") + "%" : '';
  var miQuery= miQueryArg
                ?
                  {where: ["pregunta like ?", miQueryArg], order: 'pregunta ASC'}
                :
                  ''
                ;

  models.Quiz.findAll(miQuery).then(
    function(quizes) {
      res.render('quizes/index.ejs', { quizes: quizes, search: req.query.search, errors: [] });
    }
  ).catch(function(error) { next(error)})
};


// GET /quizes/:id
exports.show = function(req, res) {
  res.render('quizes/show', { quiz: req.quiz, errors: []});
};

// GET /quizes/:id/answer
exports.answer = function(req, res) {
  var resultado = 'Incorrecto';
  if (req.query.respuesta === req.quiz.respuesta) {
    resultado = 'Correcto';
  }
  res.render('quizes/answer', {quiz: req.quiz, respuesta: resultado, errors: []});
};


// GET /quizes/new
exports.new = function(req, res) {
  var quiz = models.Quiz.build(  // Crea objeto quiz
    {pregunta: "Pregunta", respuesta: "Respuesta"}
  );

  res.render('quizes/new', {quiz: quiz, errors: []});
};

// POST /quizes/create
exports.create = function(req, res) {
  var quiz = models.Quiz.build( req.body.quiz );

// Esto es lo que está en el SERVIDOR:
//  quiz.
//    .validate()
//    .then(
//      function(err){
//        if (err) {
//          res.render('quizes/new', {quiz: quiz, errors: err.errors});
//        } else {
//            quiz
//              .save({fields: ["pregunta", "respuesta"]})
//              .then( function(){ res.redirect('/quizes')})
//          }
//      }
//    );
//};


// Esto es lo que se propone en el formamos

  var errors = quiz.validate();//ya qe el objeto errors no tiene then(

  if (errors) {
    var i=0;
    var errores= new Array(); //se convierte en [] con la propiedad message por compatibilida con layout

    for (var prop in errors) errores[i++]= { message: errors[prop] };

    res.render('quizes/new', {quiz: quiz, errors: errores});

  } else {
      quiz // save: guarda en DB campos pregunta y respuesta de quiz
        .save({fields: ["pregunta", "respuesta"]})
        .then( function(){ res.redirect('/quizes')}) ; // res.redirect: Redirección HTTP a lista de preguntas
    }
};
