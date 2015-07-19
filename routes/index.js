var express = require('express');
var router = express.Router();
var quizController=require('../controllers/quiz_controller'); // Instanciación del controlador de Quiz
var commentController = require('../controllers/comment_controller'); // Instanciación del controlador de Comment
var sessionController = require('../controllers/session_controller'); // Instanciación del controlador de session

//GET author
var authorController=require('../controllers/author_controller');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Quiz', errors: [] });
});

// Autoload de comandos con :quizId
router.param('quizId', quizController.load);  // autoload :quizId

// Definición de rutas de sesion
router.get('/login',  sessionController.new);     // formulario login
router.post('/login', sessionController.create);  // crear sesión
router.get('/logout', sessionController.destroy); // destruir sesión


// Definición de rutas de /quizes
router.get('/quizes',                      quizController.index);
router.get('/quizes/:quizId(\\d+)',        quizController.show);
router.get('/quizes/:quizId(\\d+)/answer', quizController.answer);

// Definición de rutas para  crear una nueva pregunta y respuesta
router.get('/quizes/new',                  quizController.new);
router.post('/quizes/create',              quizController.create);

// Editar preguntas
router.get('/quizes/:quizId(\\d+)/edit',   quizController.edit);
router.put('/quizes/:quizId(\\d+)',        quizController.update);

// Borrar pregunta
router.delete('/quizes/:quizId(\\d+)',     quizController.destroy);

// Rutas para los comentarios
router.get('/quizes/:quizId(\\d+)/comments/new',            commentController.new);
router.post('/quizes/:quizId(\\d+)/comments',              commentController.create);


//GET author
router.get('/author/creditos', authorController.creditos);

module.exports = router;
