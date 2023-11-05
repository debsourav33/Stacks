const express = require('express');
const VotesController = require('../controllers/VotesController');

const router = express.Router({mergeParams: true});

const controller = new VotesController();

router.get('',controller.getVotesCount);
router.post('',controller.postVotesToQuestion);

module.exports = router;