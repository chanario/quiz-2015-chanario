// Ahora lo hacemos a través del modelo concreto definido en models.js a través de Quiz
var models = require('../models/models.js');

// Autoload :id
exports.load = function(req, res, next, quizId) {
  models.Quiz.find(
                    {
                      where: { id: Number(quizId) },
                      include: [ { model: models.Comment } ]
                    }
                  ).then(
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
}; // req.quiz: instancia de quiz cargada con autoload

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
    {pregunta: "Pregunta", respuesta: "Respuesta", tema: "Otro"}
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


// Esto es lo que se propone en el foro

  var errors = quiz.validate();//ya que el objeto errors no tiene then(

  if (errors) {
    var i=0;
    var errores= new Array(); //se convierte en [] con la propiedad message por compatibilida con layout

    for (var prop in errors) errores[i++]= { message: errors[prop] };

    res.render('quizes/new', {quiz: quiz, errors: errores});

  } else {
      quiz // save: guarda en DB campos pregunta, respuesta y tema de quiz
        .save({fields: ["pregunta", "respuesta", "tema"]})
        .then( function(){ res.redirect('/quizes')}) ; // res.redirect: Redirección HTTP a lista de preguntas
    }
};

// GET /quizes/:id/edit
exports.edit = function(req, res) {
  var quiz = req.quiz;  // req.quiz: autoload de instancia de quiz

  res.render('quizes/edit', {quiz: quiz, errors: []});
};

// PUT /quizes/:id
exports.update = function(req, res) {
  req.quiz.pregunta  = req.body.quiz.pregunta;
  req.quiz.respuesta = req.body.quiz.respuesta;
  req.quiz.tema      = req.body.quiz.tema;

/* Esto es lo que tenía el servidor quiz; pero igualmente hay que cambiarlo.
  req.quiz
  .validate()
  .then(
    function(err){
      if (err) {
        res.render('quizes/edit', {quiz: req.quiz, errors: err.errors});
      } else {
        req.quiz     // save: guarda campos pregunta y respuesta en DB
        .save( {fields: ["pregunta", "respuesta"]})
        .then( function(){ res.redirect('/quizes');});
      }     // Redirección HTTP a lista de preguntas (URL relativo)
    }
  );
*/


//Lo cambiamos como hicimos en exports.create pero ahora trabajando con req.quiz
  var errors = req.quiz.validate();//ya qe el objeto errors no tiene then(

  if (errors) {
    var i=0;
    var errores= new Array(); //se convierte en [] con la propiedad message por compatibilida con layout

    for (var prop in errors) errores[i++]= { message: errors[prop] };

    res.render('quizes/new', {quiz: req.quiz, errors: errores});

  } else {
      req.quiz // save: guarda en DB campos pregunta y respuesta de quiz
        .save({fields: ["pregunta", "respuesta", "tema"]})
        .then( function(){ res.redirect('/quizes')}) ; // res.redirect: Redirección HTTP a lista de preguntas
    }

};

// DELETE /quizes/:id
exports.destroy = function(req, res) {
  req.quiz.destroy().then( function() {
    res.redirect('/quizes');
  }).catch(function(error){next(error)});
};
