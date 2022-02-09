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

        // Check to see if value already exists in row, or spot already taken
        if (rows[row].includes(value) || rows[row][column - 1] !== '.') {
            return false;
        }
        return true;
    }

    checkColPlacement(puzzleString, row, column, value) {
        const columns = {};

        // Populate columns object with property numbers 1-9
        for (let i = 0; i < 81; i++) {
            let number = (i % 9) + 1;
            if (!columns[number]) {
                columns[number] = [];
            }
            columns[number].push(puzzleString[i]);
        }

        // Check to see if value can be placed in column
        if (
            columns[column].includes(value) &&
            columns[column][row.charCodeAt(0) - 'A'.charCodeAt(0)] !== value
        ) {
            return false;
        }
        return true;
    }

    checkRegionPlacement(puzzleString, row, column, value) {
        const regions = {};
        const location = row + column;
        let locationRegion;
        // Regex representing regions 0 - 8
        const regionRegex = [
            /[A-C][1-3]/,
            /[A-C][4-6]/,
            /[A-C][7-9]/,
            /[D-F][1-3]/,
            /[D-F][4-6]/,
            /[D-F][7-9]/,
            /[G-H][1-3]/,
            /[G-H][4-6]/,
            /[G-H][7-9]/,
        ];
        // Determine region of location
        for (let i = 0; i < 9; i++) {
            if (regionRegex[i].test(location)) {
                locationRegion = i;
            }
        }
        // Populate regions object with property numbers 0-8, representing regions
        let unit = 0;
        for (let r = 0; r < 9; r++) {
            regions[r] = [];
            let tempUnit = unit;
            for (let i = 0; i < 9; i++) {
                regions[r].push(puzzleString[tempUnit]);
                if (regions[r].length % 3 === 0) {
                    tempUnit += 7;
                } else {
                    tempUnit++;
                }
            }
            unit += 3;
            if ((r + 1) % 3 === 0) {
                unit += 18;
            }
        }
        // Check to see if value can be placed in region
        if (regions[locationRegion].includes(value)) {
            return false;
        }
        return true;
    }

    solve(puzzleString) {}
}
const puzzle = new SudokuSolver();
const row = 'A';
const column = 4;
const value = '3';
const puzzleString =
    '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.';
const result = puzzle.checkColPlacement(puzzleString, row, column, value);
console.log(result);

module.exports = SudokuSolver;
