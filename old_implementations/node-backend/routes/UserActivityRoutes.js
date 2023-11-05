const express = require('express');
const UserActivityController = require('../controllers/UserActivityController');

const router = express.Router({mergeParams: true});

const controller = new UserActivityController();

router.get('/:uid/:qid',controller.getVoteStatus);

module.exports = router;