const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

// Test puzzles
const valid =
    '..839.7.575.....964..1.......16.29846.9.312.7..754.....62..5.78.8...3.2...492...1';
const invalidChars =
    '..839.7.575m....964..1.......16.29846.9.312.7..754.....62..5.78.8...3.2...492...1';
const incorrectLength =
    '..839.7.575.....964..1.......16.29846.9.312.7..754.....62..5.78.8...3.2...492..1';
const cannotBeSolved =
    '..839.7.575.....999..1.......16.29846.9.312.7..754.....62..5.78.8...3.2...492...1';

suite('Functional Tests', () => {
    test('Solve a puzzle with valid puzzle string', function (done) {
        chai.request(server)
            .post('/api/solve')
            .send({
                puzzle: valid,
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
    test('Solve a puzzle with missing puzzle string', (done) => {
        chai.request(server)
            .post('/api/solve')
            .end((err, res) => {
                assert.equal(res.status, 200);
                assert.equal(res.body.error, 'Required field missing');
                done();
            });
    });
    test('Solve a puzzle with invalid characters', (done) => {
        chai.request(server)
            .post('/api/solve')
            .send({ puzzle: invalidChars })
            .end((err, res) => {
                assert.equal(res.status, 200);
                assert.equal(res.body.error, 'Invalid characters in puzzle');
                done();
            });
    });
});
