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

        // Check to see if value can be placed in row
        if (rows[row].includes(value) && rows[row][column - 1] !== value) {
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
        const rowNumber = row.charCodeAt(0) - 'A'.charCodeAt(0);
        const valueIndex = rowNumber * 9 + column - 1;
        const regions = {};
        let locationRegion;
        let index = 0;

        // Populate regions object with regions numbered 0-8
        for (let r = 0; r < 9; r++) {
            regions[r] = [];
            let tempIndex = index;
            for (let i = 0; i < 9; i++) {
                // Determine region of location
                if (tempIndex === valueIndex) {
                    locationRegion = r;
                }
                regions[r].push(puzzleString[tempIndex]);
                if (regions[r].length % 3 === 0) {
                    tempIndex += 7;
                } else {
                    tempIndex++;
                }
            }
            index += 3;
            if ((r + 1) % 3 === 0) {
                index += 18;
            }
        }
        // Check to see if value can be placed in region
        if (
            regions[locationRegion].includes(value) &&
            puzzleString[valueIndex] !== value
        ) {
            return false;
        }
        return true;
    }

    solve(puzzleString) {}
}
const puzzle = new SudokuSolver();
const row = 'A';
const column = 1;
const value = '1';
const puzzleString =
    '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.';
const result = puzzle.checkRegionPlacement(puzzleString, row, column, value);
console.log(result);

module.exports = SudokuSolver;
