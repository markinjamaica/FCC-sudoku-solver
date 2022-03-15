'use strict';

const SudokuSolver = require('../controllers/sudoku-solver.js');

module.exports = function (app) {
    let solver = new SudokuSolver();

    app.route('/api/check').post((req, res) => {});

    app.route('/api/solve').post((req, res) => {
        const puzzle = req.body.puzzle;

        // Check if valid puzzle
        if (solver.validate(puzzle) !== true) {
            return res.json({ error: solver.validate(puzzle) });
        }

        const solution = solver.solve(puzzle);

        // Check if no solution found
        if (!solution) {
            return res.json({ error: 'Puzzle cannot be solved' });
        }
        res.json({ solution: solution });
    });
};
