var models = require('../models/models.js');

// GET /quizes/:quizId/comments/new
exports.new = function(req, res) {
  res.render('comments/new.ejs', {quizid: req.params.quizId, errors: []});
};

// POST /quizes/:quizId/comments
exports.create = function(req, res) {
  var comment = models.Comment.build(
                  { texto: req.body.comment.texto,
                    QuizId: req.params.quizId
                  }
                );

// Esto es lo que pone en el servidor
//  comment
//  .validate()
//  .then(
//    function(err){
//      if (err) {
//        res.render('comments/new.ejs', {comment: comment, errors: err.errors});
//      } else {
//        comment // save: guarda en DB campo texto de comment
//        .save()
//        .then( function(){ res.redirect('/quizes/'+req.params.quizId)})
//      }      // res.redirect: Redirección HTTP a lista de preguntas
//    }
//  ).catch(function(error){next(error)});


// Esto es lo que habría que adaptar:
var errors = comment.validate(); //ya que el objeto errors no tiene then(

if (errors) {
  var i=0;
  var errores= new Array(); //se convierte en [] con la propiedad message por compatibilida con layout

  for (var prop in errors) errores[i++]= { message: errors[prop] };

  res.render('comments/new.ejs', {comment: comment, errors: err.errors});

} else {
    comment  // save: guarda en DB campos pregunta, respuesta y tema de quiz
      .save()
      .then( function(){ res.redirect('/quizes/'+req.params.quizId)}); // res.redirect: Redirección HTTP a lista de preguntas
  }
};
