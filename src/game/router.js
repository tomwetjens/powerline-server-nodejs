const express = require('express');

const handlers = require('./handlers');

const router = new express.Router();

router.get('/games', handlers.getGames);

router.post('/games', handlers.createGame);

router.post('/games/:id/accept', (req, res, next) => {
    handlers.answerInvitation(true, req, res, next);
});

router.post('/games/:id/reject', (req, res, next) => {
    handlers.answerInvitation(false, req, res, next);
});

module.exports = router;