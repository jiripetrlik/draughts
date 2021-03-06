import React from 'react';
import Chessboard from "../Chessboard/Chessboard"
import Chat from "../Chat/Chat"
import "./Game.css"
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { sendMessage } from '../../api';

class Game extends React.Component<Readonly<any>, Readonly<any>> {

  constructor(props: any) {
    super(props)
    this.leaveGame = this.leaveGame.bind(this)
  }
  
  leaveGame() {
    const command = {
      Name: "leave-game",
      Parameters: ""
    }

    sendMessage(JSON.stringify(command))
  }
  
  render() {
    let info = ""
    let myTurn = false
    if (this.props.nextMove === this.props.player) {
      myTurn = true
    }
    
    if (this.props.nextMove.includes("won")) {
      const victor = this.props.nextMove.includes("white") ? "white" : "black"
      if (this.props.player === victor) {
        info = "You've won"
      } else {
        info = "You've lost"
      }
    } else if (this.props.nextMove === "oponent-left") {
      info = "Your oponent has left"
    } else {
      if (myTurn) {
        info = "Your turn"
      } else {
        info = "Oponent's turn"
      }
    }

    return (
      <div className="game">
        <div className="game-top">
          <Chessboard size="8" pieces={this.props.pieces} player={this.props.player} myTurn={myTurn}/>
          <Chat messages={this.props.messages}/>
        </div>
        <div className="game-bottom">
          <Typography variant="h6" className="game-status">State: {info}</Typography>
          <Button variant="contained" color="primary" onClick={this.leaveGame}>Leave Game</Button>
        </div>
      </div>
    );
  }
}

export default Game
