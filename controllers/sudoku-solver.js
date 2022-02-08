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
        const rows = {};

        // Populate rows object with property names A - I
        for (let i = 0; i < 81; i++) {
            let letter = String.fromCharCode(
                'A'.charCodeAt(0) + Math.floor(i / 9)
            );
            if (!rows[letter]) {
                rows[letter] = [];
            }
            rows[letter].push(puzzleString[i]);
        }
        if (rows[row].includes(value) || rows[row][column - 1] !== '.') {
            return false;
        }
        return true;
        // if value is equal existing value in row, invalid
        // example: row = A, column = 1, value = 6
        // push puzzlestring values into selected row array
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
const row = 'A';
const column = 3;
const value = 6;
const puzzleString =
    '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.';
const result = puzzle.checkRowPlacement(puzzleString, row, column, value);
console.log(result);

module.exports = SudokuSolver;
