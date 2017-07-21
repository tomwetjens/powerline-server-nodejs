const User = require('./model');

function getUsers(req, res) {
    User.find((err, users) => {
        res.json(users);
    });
}

function getCurrentUser(req, res) {
    res.json(req.user);
}

module.exports = {getUsers, getCurrentUser};