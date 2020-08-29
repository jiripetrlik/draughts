import React from 'react';
import './App.css';
import Game from "./components/Game/Game"
import NameInput from "./components/NameInput/NameInput"
import NavigationScreen from "./components/NavigationScreen/NavigationScreen"

function App(props) {
  let status = "login"
  let players = {
    waiting: [
      {id: 1, name: "player1"},
      {id: 2, name: "player2"},
      {id: 3, name: "player3"},
      {id: 4, name: "player4"},
    ],
    playing: [
      {id: 1, names: ["Player 7", "Player 8"]},
      {id: 2, names: ["Player 9", "Player 10"]},
      {id: 3, names: ["Player 11", "Player 12"]},
    ]
  }
  let pieces = {
    whitepieces: [[5, 4], [7, 7]],
    blackpieces: [[3, 4]],
    whitequeens: [[1, 1]],
    blackqueens: [[6, 6], [4, 4]],
    moves: [[2, 2], [2, 3]]
  }
  let messages = [
    { name: "Opponent", text: "Hello"},
    { name: "You", text: "Hi!"},
    { name: "Opponent", text: "How are you?"},
  ]

  return (
    <div className="App">
      {status === "login" &&
        <NameInput/>
      }

      {status === "navigation" &&
        <NavigationScreen players={players}/>
      }

      {status === "game" &&
        <Game pieces={pieces} messages={messages}/>
      }
    </div>
  );
}

export default App;
