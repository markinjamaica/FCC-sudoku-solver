const chai = require('chai');
const assert = chai.assert;

const Solver = require('../controllers/sudoku-solver.js');
const solver = new Solver();
const testString =
    '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.';

suite('UnitTests', () => {
    // 1. Handle a valid puzzle string of 81 chars
    test('valid puzzle string of 81 chars', () => {
        assert.equal(solver.validate(testString), true);
    });
    // 2. Handle a puzzle string with invalid chars (not 1-9 or .)
    test('puzzle string with invalid chars', () => {
        assert.equal(
            solver.validate(
                '1.5..2.84..63.12.7.2..5.....9..1....m.2.3674.3.7.2..9.47...8..1..16....926914.37.'
            ),
            'Invalid characters in puzzle'
        );
    });
    // 3. Handle a puzzle string that is not 81 chars in length
    test('puzzle string that is not 81 chars', () => {
        assert.equal(
            solver.validate(
                '1.5..32.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.'
            ),
            'Expected puzzle to be 81 characters long'
        );
    });
    // 4. Handle a valid row placement
    test('valid row placement', () => {
        assert.equal(solver.checkRowPlacement(testString, 'A', 2, '3'), true);
    });
    // 5. Handle an invalid row placement
    test('invalid row placement', () => {
        assert.equal(solver.checkRowPlacement(testString, 'A', 2, '8'), false);
    });
    // 6. Handle a valid column placement
    // 7. Handle an invalid column placement
    // 8. Handle a valid region (3x3 grid) placement
    // 9. Handle an invalid region (3x3 grid) placement
    // 10. Valid puzzle strings pass the solver
    // 11. Invalid puzzle strings fail the solver
    // 12. Solver returns the expected solution for an incomplete puzzle
});
