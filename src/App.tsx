import React from 'react';
import Game from './components/Game.tsx';

const App: React.FC = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <Game />
    </div>
  );
};

export default App;
