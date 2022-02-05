const chai = require('chai');
const assert = chai.assert;

const Solver = require('../controllers/sudoku-solver.js');
let solver;

suite('UnitTests', () => {
    // 1. Handle a valid puzzle string of 81 chars
    // 2. Handle a puzzle string with invalid chars (not 1-9 or .)
    // 3. Handle a puzzle string that is not 81 chars in length
    // 4. Handle a valid row placement
    // 5. Handle an invalid row placement
    // 6. Handle a valid column placement
    // 7. Handle an invalid column placement
    // 8. Handle a valid region (3x3 grid) placement
    // 9. Handle an invalid region (3x3 grid) placement
    // 10. Valid puzzle strings pass the solver
    // 11. Invalid puzzle strings fail the solver
    // 12. Solver returns the expected solution for an incomplete puzzle
});
