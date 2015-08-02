
var express = require('express');
var router = express.Router();

var quizController = require('../controllers/quiz_controller');

//GET créditos autoria
router.get('/',function(req,res){
  res.render('author', {title:'Quiz'});
});
/*
router.get('/', function(req, res) {
  res.render('index', { title: 'Home page' })
});
*/
//router.get('author', quizController.author);

module.exports = router;


/*

router.get('/', function(req, res) {
  res.render('index', { title: 'Quiz' });
});
*/
