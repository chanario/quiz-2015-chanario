// Ahora lo hacemos a través del modelo concreto definido en models.js a través de Quiz
var models = require('../models/models.js');

// GET /quizes
exports.index = function(req, res) {
  models.Quiz.findAll().then(function(quizes) {
    res.render('quizes/index.ejs', { quizes: quizes});
  })
};

// GET /quizes/:id
exports.show = function(req, res) {
  models.Quiz.find(req.params.quizId).then(function(quiz) {
    res.render('quizes/show', { quiz: quiz});
  })
};

// GET /quizes/:id/answer
exports.answer = function(req, res) {
  models.Quiz.find(req.params.quizId)
    .then(function(quiz) {
        // renderiza Views/quizes/answer.ejs con correcto o incorrecto
        if (req.query.respuesta === quiz.respuesta) {
          res.render('quizes/answer', { quiz: quiz, respuesta: 'Correcto' });
        } else {
          res.render('quizes/answer', { quiz: quiz, respuesta: 'Incorrecto'});
        }
      }
    ) // then
};
