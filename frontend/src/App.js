import React from 'react';
import './App.css';
import Game from "./components/Game/Game"
import NameInput from "./components/NameInput/NameInput"
import NavigationScreen from "./components/NavigationScreen/NavigationScreen"

function App(props) {
  let status = "game"
  let pieces = {
    whitepieces: [[5, 4], [7, 7]],
    blackpieces: [[3, 4]],
    whitequeens: [[1, 1]],
    blackqueens: [[6, 6], [4, 4]],
    moves: [[2, 2], [2, 3]]
  }

  return (
    <div className="App">
      {status === "login" &&
        <NameInput/>
      }

      {status === "navigation" &&
        <NavigationScreen/>
      }

      {status === "game" &&
        <Game pieces={pieces}/>
      }
    </div>
  );
}

export default App;
