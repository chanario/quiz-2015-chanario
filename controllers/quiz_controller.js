// Ahora lo hacemos a través del modelo concreto definido en models.js a través de Quiz
var models = require('../models/models.js');

// GET /quizes/question
exports.question = function(req, res) {
// findAll([options]) donde options es una búsqueda SQL (si está vacía las encuentra todas)
  models.Quiz.findAll()
    .success(function(quiz) {
        // renderiza Views/quizes/question.ejs y le pasa la primera pregunta que encuentra.
        res.render('quizes/question', { pregunta: quiz[0].pregunta});
      }
    )
};

// GET /quizes/answer
exports.answer = function(req, res) {
  models.Quiz.findAll()
    .success(function(quiz) {
        // renderiza Views/quizes/answer.ejs con correcto o incorrecto
        if (req.query.respuesta === quiz[0].respuesta) {
          res.render('quizes/answer', { respuesta: 'Correcto' });
        } else {
          res.render('quizes/answer', { respuesta: 'Incorrecto'});
        }
      }
    )
};
