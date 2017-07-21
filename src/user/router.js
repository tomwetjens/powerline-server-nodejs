const express = require('express');

const handlers = require('./handlers');

const router = new express.Router();

router.get('/users', handlers.getUsers);

router.get('/user', handlers.getCurrentUser);

module.exports = router;
