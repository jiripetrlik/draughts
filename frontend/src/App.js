import React from 'react';
import './App.css';
import Game from "./components/Game/Game"

function App() {
  let pieces = {
    whitepieces: [[5, 4], [7, 7]],
    blackpieces: [[3, 4]],
    whitequeens: [[1, 1]],
    blackqueens: [[6, 6], [4, 4]],
    moves: [[2, 2], [2, 3]]
  }

  return (
    <div className="App">
      <Game pieces={pieces}/>
    </div>
  );
}

export default App;
