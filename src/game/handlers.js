const Game = require('./model');
const User = require('../user/model');

function getGames(req, res) {
    Game.find((err, games) => {
        res.json(games);
    });
}

function createGame(req, res, next) {
    const playerNames = new Set(req.body.players);

    if (!playerNames.has(req.user.name)) {
        return next(new Error('current user must be a player'));
    }

    if (playerNames.size < 2) {
        return next(new Error('must have at least 2 players'));
    }

    User.find({name: {$in: Array.from(playerNames)}}, (err, users) => {
        if (users.length !== playerNames.size) {
            return next(new Error('player not found'));
        }

        new Game({
            players: users.map(user => {
                const current = req.user.name === user.name;

                return {
                    user: user._id,
                    accepted: current,
                    invited: new Date(),
                    answered: current ? new Date() : undefined
                }
            }),
            created: new Date()
        }).save((err, game) => {
            res.json(game);

            next();
        });
    });
}

function answerInvitation(accepted, req, res, next) {
    Game.findOne({_id: req.params.id}, (err, game) => {
        const player = game.players.find(player => player.user.toString() === req.user._id.toString());

        if (!player) {
            return next(new Error('current user is not a player'));
        }

        if (player.answered) {
            return next(new Error('already accepted or rejected'));
        }

        player.answered = new Date();
        player.accepted = accepted;

        if (game.players.every(player => player.answered)) {
            // all players answered, start the game

            const accepts = game.players.filter(player => player.accepted);

            if (accepts.length >= 2) {
                // TODO split players and invitations
                game.players = accepts;

                game.started = new Date();

                // TODO initialize game state
            } else {
                // cancel game, not enough players
                game.canceled = new Date();
                // TODO notify
            }
        }

        game.save((err, game) => {
            res.json(game);
            next();
        });
    });
}

module.exports = {getGames, createGame, answerInvitation};