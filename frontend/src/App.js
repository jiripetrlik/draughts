import React from 'react';
import './App.css';
import Game from "./components/Game/Game"
import NameInput from "./components/NameInput/NameInput"
import NavigationScreen from "./components/NavigationScreen/NavigationScreen"
import OponentWaiting from "./components/OponentWaiting/OponentWaiting"
import { connect } from "./api/index"

class App extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      Status: "login",

      Players: {
        waiting: [
          { id: 1, name: "player1" },
          { id: 2, name: "player2" },
          { id: 3, name: "player3" },
          { id: 4, name: "player4" },
        ],
        playing: [
          { id: 1, names: ["Player 7", "Player 8"] },
          { id: 2, names: ["Player 9", "Player 10"] },
          { id: 3, names: ["Player 11", "Player 12"] },
        ]
      },
  
      Pieces: {
        whitepieces: [[5, 4], [7, 7]],
        blackpieces: [[3, 4]],
        whitequeens: [[1, 1]],
        blackqueens: [[6, 6], [4, 4]],
        moves: [[2, 2], [2, 3]]
      },

      Messages: [
        { name: "Opponent", text: "Hello" },
        { name: "You", text: "Hi!" },
        { name: "Opponent", text: "How are you?" },
      ]
    }
  }

  componentDidMount() {
    connect((msg) => {
      let state = JSON.parse(msg.data)
      this.setState(state)
    })
  }

  render() {
    return (
      <div className="App">
        {this.state.Status === "login" &&
          <NameInput />
        }

        {this.state.Status === "navigation" &&
          <NavigationScreen players={this.state.Players} />
        }

        {this.state.Status === "waiting" &&
          <OponentWaiting/>
        }

        {this.state.Status === "game" &&
          <Game pieces={this.state.Pieces} messages={this.state.Messages} />
        }
      </div>
    );
  }
}

export default App;
