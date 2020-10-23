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
                <td>{index + 1}</td>
                {cells}
            </tr>
        )
    }
    
    pieceType(row, column) {
        for (const i in this.props.pieces.Whitepieces) {
            const coordinates = this.props.pieces.Whitepieces[i]

            if (coordinates.X === row && coordinates.Y === column) {
                return "white-piece"
            }
        }

        for (const i in this.props.pieces.Blackpieces) {
            const coordinates = this.props.pieces.Blackpieces[i]

            if (coordinates.X === row && coordinates.Y === column) {
                return "black-piece"
            }
        }

        for (const i in this.props.pieces.Whitequeens) {
            const coordinates = this.props.pieces.Whitequeens[i]

            if (coordinates.X === row && coordinates.Y === column) {
                return "white-queen"
            }
        }

        for (const i in this.props.pieces.Blackqueens) {
            const coordinates = this.props.pieces.Blackqueens[i]

            if (coordinates.X === row && coordinates.Y === column) {
                return "black-queen"
            }
        }

        for (const i in this.props.pieces.Moves) {
            const coordinates = this.props.pieces.Moves[i]

            if (coordinates.X === row && coordinates.Y === column) {
                return "move"
            }
        }

        return "none"
    }

    render() {
        let rows = []
        if (this.props.player === "white") {
            for (let i = this.size - 1; i >= 0; i--) {
                rows.push(this.createRow(i))
            }
        } else {
            for (let i = 0; i < this.size; i++) {
                rows.push(this.createRow(i))
            }
        }

        let indexes = []
        indexes.push(<td key="1"></td>)
        for (let i = 65; i < 73; i++) {
            indexes.push(<td key={i}>{String.fromCharCode(i)}</td>)
        }

        return (
            <table className="chessboard">
                <tbody>
                    {rows}
                    <tr>{indexes}</tr>
                </tbody>
            </table>
        )
    }
}

export default Chessboard;
