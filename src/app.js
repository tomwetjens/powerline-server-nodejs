const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const User = require('./user/model');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/powerline', {useMongoClient: true});

// TODO Remove test data
User.findOne({name: 'tom'}, (err, user) => {
    if (!user) {
        new User({name: 'tom'}).save();
    }
});
User.findOne({name: 'sharon'}, (err, user) => {
    if (!user) {
        new User({name: 'sharon'}).save();
    }
});

const app = express();

app.use(bodyParser.json());

app.use('/api',
    require('./auth'),
    require('./user/router'),
    require('./game/router'));

module.exports = app;