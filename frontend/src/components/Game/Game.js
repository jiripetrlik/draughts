import React from 'react';
import Chessboard from "../Chessboard/Chessboard"

function Game(props) {
    return (
        <div className="Game">
          <Chessboard size="8" pieces={props.pieces} player="white"/>
        </div>
      );
}

export default Game
