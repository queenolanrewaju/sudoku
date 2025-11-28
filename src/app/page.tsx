'use client';

import { useState, useEffect } from 'react';
import sudokuGen from './api/numberGen';

export default function Home() {
  const [grid, setGrid] = useState<number[][]>([]);
  const [ solution, setSolution] = useState<number[][]>([]);
  const [initialGrid, setInitialGrid] = useState<number[][]>([]);
  const [initialSolution, setInitialSolution] = useState<number[][]>([]);
  const [message, setMessage] = useState('');
  const difficulty = "ml-10 px-6 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 font-semibold"
  const clicked = "ml-10 bg-purple-500 px-6 py-2 text-white rounded-lg hover:bg-purple-600 font-semibold"
  const [selectedDifficulty, setSelectedDifficulty] = useState('easy');

  useEffect(() => {
    const { puzzle, solution } = sudokuGen(selectedDifficulty);
    setSolution(solution);
    setGrid(puzzle);
    setInitialGrid(JSON.parse(JSON.stringify(puzzle)));
    setInitialSolution(JSON.parse(JSON.stringify(solution)));
  }, [selectedDifficulty]);

  const getNumber = (boxIndex: number, cellIndex: number) => {
    if (grid.length === 0) return '';
    
    const boxRow = Math.floor(boxIndex / 3);
    const boxCol = boxIndex % 3;
    const cellRow = Math.floor(cellIndex / 3);
    const cellCol = cellIndex % 3;
    
    const row = boxRow * 3 + cellRow;
    const col = boxCol * 3 + cellCol;
    
    return grid[row][col] || '';
  };

  const isEditable = (boxIndex: number, cellIndex: number) => {
    if (initialGrid.length === 0) return false;
    
    const boxRow = Math.floor(boxIndex / 3);
    const boxCol = boxIndex % 3;
    const cellRow = Math.floor(cellIndex / 3);
    const cellCol = cellIndex % 3;
    
    const row = boxRow * 3 + cellRow;
    const col = boxCol * 3 + cellCol;
    
    return initialGrid[row][col] === 0;
  };

const checkSolution = () => {
  const isCorrect = grid.every((row, rowIndex) => 
    row.every((cell, colIndex) => cell === solution[rowIndex][colIndex])
  );

  if (isCorrect) {
    setMessage(' Congratulations! You won!');
  } else {
    setMessage(' Not quite right. Keep trying!');
  }
};

  const handleCellChange = (boxIndex: number, cellIndex: number, value: string) => {
    const boxRow = Math.floor(boxIndex / 3);
    const boxCol = boxIndex % 3;
    const cellRow = Math.floor(cellIndex / 3);
    const cellCol = cellIndex % 3;
    
    const row = boxRow * 3 + cellRow;
    const col = boxCol * 3 + cellCol;
    
    // Only allow numbers 1-9 or empty string
    if (value !== '' && (!/^[1-9]$/.test(value))) {
      return;
    }
    
    const puzzle= [...grid];
    puzzle[row][col] = value === '' ? 0 : parseInt(value);
    setGrid(puzzle);
  };

  const handleNewGame = () => {
    const { puzzle, solution} = sudokuGen(selectedDifficulty);
    setGrid(puzzle);
    setSolution(solution);
    setInitialGrid(JSON.parse(JSON.stringify(puzzle)));
    setInitialSolution(JSON.parse(JSON.stringify(solution)));
  };

  return (
    <div className="bg-purple-50 min-h-screen">
      <header className="flex justify-center p-4">
        <p className="font-bold text-xl">
          Sudoku :) 
        </p>
      </header>
      <div className="flex items-center justify-center p-8">
        <div className="grid grid-cols-3 grid-rows-3 gap-0 border-4 border-pink-500">
          {[...Array(9)].map((_, boxIndex) => (
            <div 
              key={boxIndex}
              className="grid grid-cols-3 grid-rows-3 gap-0 border-2 border-pink-300"
            >
              {[...Array(9)].map((_, cellIndex) => (
                <div 
                  key={cellIndex}
                  className="w-14 h-14 border border-pink-100 flex items-center justify-center text-xl font-semibold"
                >
                  {isEditable(boxIndex, cellIndex) ? (
                    <input
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={getNumber(boxIndex, cellIndex)}
                      onChange={(e) => handleCellChange(boxIndex, cellIndex, e.target.value)}
                      className="w-full h-full text-center bg-transparent outline-none hover:bg-purple-100 focus:bg-purple-200 text-purple-700"
                    />
                  ) : (
                    <span className="text-gray-900 font-bold">
                      {getNumber(boxIndex, cellIndex)}
                    </span>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
        </div>
        <div className=' flex justify-center mb-10'>

        <button 
          className={`${difficulty} ${selectedDifficulty === 'easy' ? clicked : ''}`}
          onClick={() => setSelectedDifficulty('easy')}
        >
          Easy
        </button>

        <button 
          className={`${difficulty} ${selectedDifficulty === 'medium' ? clicked : ''}`}
          onClick={() => setSelectedDifficulty('medium')}
        >
          Medium
        </button>

        <button 
          className={`${difficulty} ${selectedDifficulty === 'hard' ? clicked : ''}`}
          onClick={() => setSelectedDifficulty('hard')}
        >
          Hard
        </button>
      </div>
      <div className="flex justify-center">
        <button 
          onClick={handleNewGame}
          className="px-6 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 font-semibold"
        >
          New Game
        </button>
      <button 
        onClick={checkSolution}
        className="ml-5 px-6 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 font-semibold"
      >
        Check Solution
      </button>
    </div>
    
    {/* Display the message */}
    {message && (
      <div className="flex justify-center mt-4">
        <p className="text-xl font-bold">{message}</p>
      </div>
    )}
  </div>
  );
}