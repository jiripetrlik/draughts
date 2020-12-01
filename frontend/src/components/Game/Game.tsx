import React from 'react';
import Chessboard from "../Chessboard/Chessboard"
import Chat from "../Chat/Chat"
import "./Game.css"

class Game extends React.Component<Readonly<any>, Readonly<any>> {
  render() {
    let myTurn = false
    if (this.props.nextMove === this.props.player) {
      myTurn = true
    }
    let info = ""
    if (myTurn) {
      info = "Your turn"
    } else {
      info = "Oponent's turn"
    }

    return (
      <div className="game">
        <Chessboard size="8" pieces={this.props.pieces} player={this.props.player} myTurn={myTurn}/>
        <Chat messages={this.props.messages}/>
        <div className="game-status">{info}</div>
      </div>
    );
  }
}

export default Game
