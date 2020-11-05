import React from "react"
import Chessboardsquare from "../ChessboardSquare/ChessboardSquare"
import "./Chessboard.css"

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
            cells.push(<Chessboardsquare key={i} row={index} column={i} pieceType={this.pieceType(index, i)}
                selected={this.isSelected(index, i)} onHandleClick={this.handleSquareClick}/>)
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

        return "none"
    }

    pieceTypeOrMove(row, column) {
        let type = this.pieceType(row, column)
        
        for (const i in this.state.possibleMoves) {
            const coordinates = this.state.possibleMoves[i]

            if (coordinates.X === row && coordinates.Y === column) {
                return "move"
            }
        }

        return type
    }

    isSelected(x, y) {
        console.log("Is selected called for: " + x + " " + y)
        if (this.state.selected != null) {
            if ((x === this.state.selected.X) && (y === this.state.selected.Y)) {
                return "yes"
            }
        }

        return "no"
    }

    containsPiece(x, y) {
        let p
        if (this.props.player === "white") {
            p = this.props.pieces.Whitepieces
        } else {
            p = this.props.pieces.Blackpieces
        }

        for (const i in p) {
            const coordinates = p[i]
            if ((coordinates.X === x) && (coordinates.Y === y)) {
                return true
            }
        }

        return false
    }
    
    handleSquareClick(x, y) {
        if (this.containsPiece(x, y)) {
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
