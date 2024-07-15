
import React, { useState, useEffect } from 'react';
import Grid from './Grid';
import "./Game.css"
import { patterns } from './Patterns';

const createEmptyGrid = (rows: number, cols: number) => {
  const grid = [];
  for (let row = 0; row < rows; row++) {
    grid.push(Array(cols).fill(false));
  }
  return grid;
};



const applyPattern = (pattern: number[][], grid: boolean[][]) => {
  const newGrid = createEmptyGrid(grid.length, grid[0].length);
  pattern.forEach(([x, y]) => {
    if (x >= 0 && x < grid.length && y >= 0 && y < grid[0].length) {
      newGrid[x][y] = true;
    }
  });
  return newGrid;
};

const Game: React.FC = () => {
  const [grid, setGrid] = useState<boolean[][]>(() => createEmptyGrid(30, 30));
  const [isRunning, setIsRunning] = useState(false);

  const toggleCellState = (row: number, col: number) => {
    const newGrid = grid.map((currentRow, rowIndex) =>
      currentRow.map((cell, colIndex) => {
        if (rowIndex === row && colIndex === col) {
          return !cell;
        }
        return cell;
      })
    );
    setGrid(newGrid);
  };

  const countNeighbors = (grid: boolean[][], x: number, y: number) => {
    const directions = [
      [0, 1], [1, 1], [1, 0], [1, -1],
      [0, -1], [-1, -1], [-1, 0], [-1, 1]
    ];
    let count = 0;
    directions.forEach(([dx, dy]) => {
      const newX = x + dx;
      const newY = y + dy;
      if (newX >= 0 && newX < grid.length && newY >= 0 && newY < grid[0].length) {
        count += grid[newX][newY] ? 1 : 0;
      }
    });
    return count;
  };

  const updateGrid = () => {
    const newGrid = grid.map((row, rowIndex) =>
      row.map((cell, colIndex) => {
        const neighbors = countNeighbors(grid, rowIndex, colIndex);
        if (cell && (neighbors < 2 || neighbors > 3)) {
          return false;
        }
        if (!cell && neighbors === 3) {
          return true;
        }
        return cell;
      })
    );
    setGrid(newGrid);
  };

  useEffect(() => {
    if (!isRunning) return;
    const interval = setInterval(updateGrid, 500);
    return () => clearInterval(interval);
  }, [isRunning, grid]);

  const handlePatternSelect = (pattern: string) => {
    if (pattern === 'randomPattern') {
      const patternKeys = Object.keys(patterns);
      const randomPatternKey = patternKeys[Math.floor(Math.random() * patternKeys.length)];
      setGrid(applyPattern(patterns[randomPatternKey], grid));
    } else {
      setGrid(applyPattern(patterns[pattern], grid));
    }
  };

  return (

    <div className='game-container flex-row'> 
       <div className='border-8 border-gray-600 '>
            <Grid grid={grid} toggleCellState={toggleCellState} />
        </div>
        <div>
            <div className='mb-20 '>
                 <h1 className='ml-40 text text-6xl font-bold'>CONWAY'S </h1>
               <h1 className='ml-32 text text-6xl font-bold'>GAME OF LIFE</h1>
            </div>
              
              <div className="flex-col  mb-32">
                    <div className=' ml-20'>
                        <button onClick={() => setIsRunning(!isRunning)}   className="h-12 w-32 px-4 py-2 bg-green-500 text-yellow-50 rounded-xl">
                        {isRunning ? 'Stop' : 'Start'}
                        </button>

                    </div>
                    <div className='mt-10 ml-10'>
                        <button onClick={() => setGrid(createEmptyGrid(30, 30))} className="h-12 w-32 px-4 py-2 ml-10 bg-red-500 text-white rounded-xl">
                        Clear
                        </button>
                    </div>
                    <div className='mt-10 ml-10'>
                      <button onClick={() => handlePatternSelect('randomPattern')} className="h-12 w-48 px-4 py-2 ml-10 bg-orange-500 text-white rounded-xl">
                       Random Pattern
                      </button>
                    </div>
               
                
               
                </div>
        </div>
       
      
     
    </div>
  );
};

export default Game;

