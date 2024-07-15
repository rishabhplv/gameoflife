import React from 'react';

interface CellProps {
  isAlive: boolean;
  toggleCellState: () => void;
}

const Cell: React.FC<CellProps> = ({ isAlive, toggleCellState }) => {
  return (
    <div
      onClick={toggleCellState}
      className={` h-5 w-5 border ${isAlive ? 'bg-black' : 'bg-white'}`}
    ></div>
  );
};

export default Cell;
