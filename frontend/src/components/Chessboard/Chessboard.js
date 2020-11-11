import React from "react"
import Chessboardsquare from "../ChessboardSquare/ChessboardSquare"
import "./Chessboard.css"
import {containsPieceWithColor, pieceType} from "../../logic/index"

class Chessboard extends React.Component {

    constructor(props) {
        super(props)
        this.size = parseInt(props.size)
        this.state = {
            selected: null,
            possibleMoves: []
        }

        this.handleSquareClick = this.handleSquareClick.bind(this)
    }

    createRow(index) {
        let cells = []
        for (var i = 0; i < this.size; i++) {
            cells.push(<Chessboardsquare key={i} row={index} column={i}
                pieceType={pieceType(index, i, this.props.pieces)}
                selected={this.isSelected(index, i)} onHandleClick={this.handleSquareClick}/>)
        }

        return (
            <tr key={index}>
                <td>{index + 1}</td>
                {cells}
            </tr>
        )
    }

    pieceTypeOrMove(row, column) {
        let type = pieceType(row, column, this.props.pieces)
        
        for (const i in this.state.possibleMoves) {
            const coordinates = this.state.possibleMoves[i]

            if (coordinates.X === row && coordinates.Y === column) {
                return "move"
            }
        }

        return type
    }

    isSelected(x, y) {
        if (this.state.selected != null) {
            if ((x === this.state.selected.X) && (y === this.state.selected.Y)) {
                return "yes"
            }
        }

        return "no"
    }
    
    handleSquareClick(x, y) {
        if (containsPieceWithColor(x, y, this.props.player, this.props.pieces)) {
            this.setState({
                selected: {
                    X: x,
                    Y: y,
                }
            })
        } else {
            this.setState({ selected: null})
        }

        console.log(this.containsPiece(x, y))
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
