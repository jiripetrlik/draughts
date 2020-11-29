import React from 'react';
import './App.css';
import Game from "./components/Game/Game"
import NameInput from "./components/NameInput/NameInput"
import NavigationScreen from "./components/NavigationScreen/NavigationScreen"
import OponentWaiting from "./components/OponentWaiting/OponentWaiting"
import { connect } from "./api/index"

class App extends React.Component<Readonly<any>, Readonly<any>> {

  constructor(props: any) {
    super(props)

    this.state = {
      Status: "login",
    }
  }

  componentDidMount() {
    connect((msg: any) => {
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
          <Game player={this.state.Color} nextMove={this.state.NextMove} pieces={this.state.Pieces} messages={this.state.Messages} />
        }
      </div>
    );
  }
}

export default App;
