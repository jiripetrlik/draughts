import React from 'react';
import Chessboard from "../Chessboard/Chessboard"
import Chat from "../Chat/Chat"

class Game extends React.Component<Readonly<any>, Readonly<any>> {
  render() {
    let myTurn = false
    if (this.props.nextMove === this.props.player) {
      myTurn = true
    }

    return (
      <div className="Game">
        <Chessboard size="8" pieces={this.props.pieces} player={this.props.player} myTurn={myTurn}/>
        <Chat messages={this.props.messages}/>
      </div>
    );
  }
}

export default Game
