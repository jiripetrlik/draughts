import React from "react"
import Chessboardsquare from "../ChessboardSquare/ChessboardSquare"
import "./Chessboard.css"

class Chessboard extends React.Component {

    constructor(props) {
        super(props)
        this.size = parseInt(props.size)
    }

    createRow(index) {
        let cells = []
        for (var i = 0; i < this.size; i++) {
            cells.push(<Chessboardsquare key={i} row={index} column={i} pieceType={this.pieceType(index, i)}/>)
        }

        return (
            <tr key={index}>
                {cells}
            </tr>
        )
    }
    
    pieceType(row, column) {
        for (const i in this.props.pieces.whitepieces) {
            const coordinates = this.props.pieces.whitepieces[i]

            if (coordinates[0] === row && coordinates[1] === column) {
                return "white-piece"
            }
        }

        for (const i in this.props.pieces.blackpieces) {
            const coordinates = this.props.pieces.blackpieces[i]

            if (coordinates[0] === row && coordinates[1] === column) {
                return "black-piece"
            }
        }

        for (const i in this.props.pieces.whitequeens) {
            const coordinates = this.props.pieces.whitequeens[i]

            if (coordinates[0] === row && coordinates[1] === column) {
                return "white-queen"
            }
        }

        for (const i in this.props.pieces.blackqueens) {
            const coordinates = this.props.pieces.blackqueens[i]

            if (coordinates[0] === row && coordinates[1] === column) {
                return "black-queen"
            }
        }

        for (const i in this.props.pieces.moves) {
            const coordinates = this.props.pieces.moves[i]

            if (coordinates[0] === row && coordinates[1] === column) {
                return "move"
            }
        }

        return "none"
    }

    render() {
        let rows = []
        for (var i = this.size - 1; i >= 0; i--) {
            rows.push(this.createRow(i))
        }

        return (
            <table className="chessboard">
                <tbody>
                    {rows}
                </tbody>
            </table>
        )
    }
}

export default Chessboard;
