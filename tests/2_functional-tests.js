const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', () => {
    test('Solve a puzzle with valid puzzle string', function (done) {
        chai.request(server)
            .post('/api/solve')
            .send({
                puzzle: '..839.7.575.....964..1.......16.29846.9.312.7..754.....62..5.78.8...3.2...492...1',
            })
            .end(function (err, res) {
                assert.equal(res.status, 200);
                assert.equal(
                    res.body.solution,
                    '218396745753284196496157832531672984649831257827549613962415378185763429374928561'
                );
                done();
            });
    });
});
