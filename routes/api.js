'use strict';

const SudokuSolver = require('../controllers/sudoku-solver.js');

module.exports = function (app) {
    let solver = new SudokuSolver();

    app.route('/api/check').post((req, res) => {
        // Check for missing required fields
        if (!req.body.puzzle || !req.body.coordinate || !req.body.value) {
            return res.json({ error: 'Required field(s) missing' });
        }

        const puzzleString = req.body.puzzle;
        const row = req.body.coordinate[0];
        const column = req.body.coordinate[1];
        const value = req.body.value;

        // Check if invalid puzzle
        if (solver.validate(puzzleString) !== true) {
            return res.json({ error: solver.validate(puzzleString) });
        }

        // Check if invalid coordinate
        const coordinateRegex = /^([A-I][1-9])$/;
        if (!coordinateRegex.test(req.body.coordinate)) {
            return res.json({ error: 'Invalid coordinate' });
        }

        // Check if invalid value
        const valueRegex = /^([1-9]$)/;
        if (!valueRegex.test(value)) {
            return res.json({ error: 'Invalid value' });
        }

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

        // Check for conflicts
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
