const chai = require('chai');
const chaiHttp = require('chai-http');

const server = require('../server');

chai.use(chaiHttp);
const should = chai.should();

describe('Game', function () {
    describe('GET /games', function () {
        it('should return all games', function (done) {
            chai.request(server)
                .get('/api/games')
                .auth('tom', 'secret')
                .end((err, res) => {
                    res.should.have.status(200);

                    done();
                });
        });

        it('should return 401 if not logged in', function (done) {
            chai.request(server)
                .get('/api/games')
                .end((err, res) => {
                    res.should.have.status(401);

                    done();
                });
        });
    });

    describe('Create game', function () {
        it('should create a game', function (done) {
            chai.request(server)
                .post('/api/games')
                .auth('tom', 'secret')
                .send({
                    players: ['tom', 'sharon']
                })
                .end((err, res) => {
                    res.should.have.status(200);

                    res.body.players.should.have.lengthOf(2);

                    should.exist(res.body.players[0].user);
                    res.body.players[0].accepted.should.equal(true);

                    should.exist(res.body.players[1].user);
                    res.body.players[1].accepted.should.equal(false);

                    done();
                });
        });

        it('should return 401 if not logged in', function (done) {
            chai.request(server)
                .get('/api/games')
                .end((err, res) => {
                    res.should.have.status(401);

                    done();
                });
        });
    });
});