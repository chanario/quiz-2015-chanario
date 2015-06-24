var express = require('express');
var router = express.Router();
var quizController=require('../controllers/quiz_controller');

//GET author
var authorController=require('../controllers/author_controller');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Quiz', errors: [] });
});

// Autoload de comandos con :quizId
router.param('quizId', quizController.load);  // autoload :quizId

// Definición de rutas de /quizes
router.get('/quizes',                      quizController.index);
router.get('/quizes/:quizId(\\d+)',        quizController.show);
router.get('/quizes/:quizId(\\d+)/answer', quizController.answer);

// Definición de rutas para  crear una nueva pregunta y respuesta
router.get('/quizes/new',                  quizController.new);
router.post('/quizes/create',              quizController.create);

//GET author
router.get('/author/creditos', authorController.creditos);

module.exports = router;
