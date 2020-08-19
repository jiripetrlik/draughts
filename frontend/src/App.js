import React from 'react';
import './App.css';
import Chessboard from "./components/Chessboard/Chessboard"

function App() {
  let pieces = {
    whitepieces: [[5, 4], [7, 7]],
    blackpieces: [[3, 4]],
    whitequeens: [[1, 1]],
    blackqueens: [[6, 6], [4, 4]],
  }

  return (
    <div className="App">
      <Chessboard size="8" pieces={pieces}/>      
    </div>
  );
}

export default App;
