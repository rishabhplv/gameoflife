import React from 'react';
import Cell from './Cell';

interface GridProps {
  grid: boolean[][];
  toggleCellState: (row: number, col: number) => void;
}

const Grid: React.FC<GridProps> = ({ grid, toggleCellState }) => {
  return (
    <div className="grid border-black" style={{ gridTemplateColumns: `repeat(${grid[0].length}, 1rem)` }}>
      {grid.map((row, rowIndex) =>
        row.map((isAlive, colIndex) => (
          <Cell
            key={`${rowIndex}-${colIndex}`}
            isAlive={isAlive}
            toggleCellState={() => toggleCellState(rowIndex, colIndex)}
          />
        ))
      )}
    </div>
  );
};

export default Grid;
