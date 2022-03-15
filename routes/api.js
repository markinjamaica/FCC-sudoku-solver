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

        // console.log(solver.validate);
        const solution = solver.solve(puzzle);
        res.json({ solution: solution });
    });
};
