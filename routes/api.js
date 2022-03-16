'use strict';

const SudokuSolver = require('../controllers/sudoku-solver.js');

module.exports = function (app) {
    let solver = new SudokuSolver();

    app.route('/api/check').post((req, res) => {
        const puzzleString = req.body.puzzle;
        const row = req.body.coordinate[0];
        const column = req.body.coordinate[1];
        const value = req.body.value;

        let conflict = [];

        const rowCheck = solver.checkRowPlacement(
            puzzleString,
            row,
            column,
            value
        );
        const colCheck = solver.checkColPlacement(
            puzzleString,
            row,
            column,
            value
        );
        const regionCheck = solver.checkRegionPlacement(
            puzzleString,
            row,
            column,
            value
        );

        if (!rowCheck) {
            conflict.push('row');
        }
        if (!colCheck) {
            conflict.push('column');
        }
        if (!regionCheck) {
            conflict.push('region');
        }

        if (conflict.length === 0) {
            res.json({ valid: true });
        } else {
            res.json({ valid: false, conflict: conflict });
        }
    });

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
