import React from 'react';
import Chessboard from "../Chessboard/Chessboard"
import Chat from "../Chat/Chat"

function Game(props) {
    return (
        <div className="Game">
          <Chessboard size="8" pieces={props.pieces} player={props.player}/>
          <Chat messages={props.messages}/>
        </div>
      );
}

export default Game
