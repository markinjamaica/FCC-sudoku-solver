class SudokuSolver {
    validate(puzzleString) {
        const validRegex = /^([1-9\.]{81})$/;
        if (!puzzleString) {
            return 'Required field missing';
        } else if (puzzleString.length !== 81) {
            return 'Expected puzzle to be 81 characters long';
        } else if (!validRegex.test(puzzleString)) {
            return 'Invalid characters in puzzle';
        }
        return true;
    }

    checkRowPlacement(puzzleString, row, column, value) {
        // if value is equal existing value in row, invalid
    }

    checkColPlacement(puzzleString, row, column, value) {
        // if value is equal to existing value in column, invalid
    }

    checkRegionPlacement(puzzleString, row, column, value) {
        // if value is equal to existing value in region, invalid
    }

    solve(puzzleString) {}
}
const puzzle = new SudokuSolver();
const result = puzzle.validate(
    '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.'
);
console.log(result);

module.exports = SudokuSolver;
