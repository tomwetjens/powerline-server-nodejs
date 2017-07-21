const chai = require('chai');
const chaiHttp = require('chai-http');

const server = require('../server');

chai.use(chaiHttp);
chai.should();

describe('User', function () {
    describe('GET /user', function () {
        it('should return current user', function (done) {
            chai.request(server)
                .get('/api/user')
                .auth('tom', 'secret')
                .end((err, res) => {
                    res.should.have.status(200);

                    done();
                });
        });

        it('should return 401 if not logged in', function (done) {
            chai.request(server)
                .get('/api/user')
                .end((err, res) => {
                    res.should.have.status(401);

                    done();
                });
        });
    });
});