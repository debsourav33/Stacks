const express = require('express');

const CommentsController = require('../controllers/CommentsController');

const router = express.Router({mergeParams : true});
const controller = new CommentsController();

router.post('/', controller.addComment);

router.get('/',controller.getComments);

module.exports = router;

