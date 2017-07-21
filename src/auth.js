const passport = require('passport');
const BasicStrategy = require('passport-http').BasicStrategy;

const User = require('./user/model');

passport.use(new BasicStrategy((username, password, done) => {
    User.findOne({name: username}, (err, user) => {
        if (!err && user) {
            // TODO Check password
        }
        done(err, user);
    });
}));

module.exports = passport.authenticate('basic', {session: false});