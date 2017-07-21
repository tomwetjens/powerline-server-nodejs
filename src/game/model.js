const mongoose = require('mongoose');

const Game = mongoose.model('Game', mongoose.Schema({
    players: [{
        user: mongoose.SchemaTypes.ObjectId,
        accepted: Boolean,
        invited: Date,
        answered: Date
    }],
    created: Date
}));

module.exports = Game;