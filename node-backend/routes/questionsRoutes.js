const express = require('express');

const CommentsRoutes = require('./CommentsRoutes');
const QuestionController = require('../controllers/QuestionsController');
const router = express.Router();

const controller = new QuestionController();

router.get('/', controller.getAllQuestions);

router.get('/:qid', controller.getQuestionByQuestionId);

router.post('/', controller.saveQuestion);

router.delete('/:qid', controller.deleteQuestion);

//comments
router.use('/:qid/comments', CommentsRoutes);


module.exports = router;



