export default function sudokuGen(difficulty) {
  // Create a 9x9 grid filled with zeros
let grid = Array(9).fill(null).map(() => Array(9).fill(0));

  // Fill the grid with valid Sudoku numbers
    fillGrid(grid);
    let solution = grid.map(row => [...row]);
    emptyCell(grid, difficulty);

return { puzzle: grid, solution: solution };
}

function fillGrid(grid,difficulty) {
  // Find the next empty cell
for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
    if (grid[row][col] === 0) {
        // Try numbers 1-9 in random order
        let numbers = shuffleArray([1, 2, 3, 4, 5, 6, 7, 8, 9]);
        
        for (let num of numbers) {
        if (isValid(grid, row, col, num)) {
            grid[row][col] = num;
            
            // Recursively try to fill the rest
            if (fillGrid(grid,difficulty)) {
            return true;
            }
            
            // Backtrack if it doesn't work
            grid[row][col] = 0;
        }
        }
        
        // No valid number found
        return false;
    }
    }
    }
    return true;

}

function emptyCell(grid, difficulty){

        let cellsToRemove;
        if(difficulty === 'easy') cellsToRemove = 20;
        else if(difficulty === 'medium') cellsToRemove = 40;
        else if(difficulty === 'hard') cellsToRemove = 50;

        let removed = 0;
        while(removed < cellsToRemove) {
        let row = Math.floor(Math.random() * 9);
        let col = Math.floor(Math.random() * 9);

        if(grid[row][col] !== 0) {
            grid[row][col] = 0;
            removed++;
        }
    }
}


function isValid(grid, row, col, num) {
  // Check row
for (let c = 0; c < 9; c++) {
    if (grid[row][c] === num) return false;
}

  // Check column
for (let r = 0; r < 9; r++) {
    if (grid[r][col] === num) return false;
}

  // Check 3x3 box
  let boxRow = Math.floor(row / 3) * 3;
  let boxCol = Math.floor(col / 3) * 3;

    for (let r = boxRow; r < boxRow + 3; r++) {
    for (let c = boxCol; c < boxCol + 3; c++) {
        if (grid[r][c] === num) return false;
    }
}

    return true;
}

function shuffleArray(array) {
    let shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
}
return shuffled;
}