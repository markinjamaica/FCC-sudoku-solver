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
        const valueIndex = rowNumber * 9 + parseInt(column) - 1;
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

    solve(puzzleString) {
        // loop through numbers 1-9 for each location, checking each value with each check
        // if multiple values could fit, leave space blank, and continue looping through
        // until board is filled, updating puzzleString constantly...
        let changesMade = true;
        while (puzzleString.includes('.') && changesMade) {
            // reset puzzleString index to O
            let i = 0;

            // reset changesMade
            changesMade = false;

            // loop over rows
            for (let r = 0; r < 9; r++) {
                // convert row number to letter. example 0 to 'A'
                let row = String.fromCharCode('A'.charCodeAt(0) + r);

                // loop over columns
                for (let column = 1; column < 10; column++) {
                    // create empty array to push possible matches to,
                    let matches = [];

                    // if location index empty check for possible matches
                    if (puzzleString[i] === '.') {
                        for (let value = 1; value < 10; value++) {
                            const stringValue = value.toString();
                            const rowCheck = this.checkRowPlacement(
                                puzzleString,
                                row,
                                column,
                                stringValue
                            );
                            const colCheck = this.checkColPlacement(
                                puzzleString,
                                row,
                                column,
                                stringValue
                            );
                            const regionCheck = this.checkRegionPlacement(
                                puzzleString,
                                row,
                                column,
                                stringValue
                            );

                            if (rowCheck && colCheck && regionCheck) {
                                matches.push(stringValue);
                            }
                        }
                        // if only one match, change value to that and move on
                        if (matches.length === 1) {
                            puzzleString = puzzleString.split('');
                            puzzleString[i] = matches[0];
                            puzzleString = puzzleString.join('');

                            changesMade = true;
                        }
                    }
                    // Update puzzlestring index
                    i++;
                }
            }
        }
        if (!changesMade) {
            return false;
        }
        return puzzleString;
    }
}

// const puzzle = new SudokuSolver();
// const row = 'C';
// const column = '3';
// const value = '2';
// const puzzleString =
//     '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
// const result = puzzle.checkRegionPlacement(puzzleString, row, column, value);
// console.log(result);

module.exports = SudokuSolver;
