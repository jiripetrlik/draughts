import React from "react"
import Chessboardsquare from "../ChessboardSquare/ChessboardSquare"
import "./Chessboard.css"
import {Coordinates, containsPieceWithColor, MoveDescription, pieceType, possibleMoves} from "../../logic/index"
import { sendMessage } from "../../api"

interface ChessboardState {
    selected: Coordinates | null
    possibleMoves: Array<MoveDescription>
}

class Chessboard extends React.Component<Readonly<any>, Readonly<ChessboardState>> {

    size: number

    constructor(props: any) {
        super(props)
        this.size = parseInt(props.size)
        this.state = {
            selected: null,
            possibleMoves: []
        }

        this.handleSquareClick = this.handleSquareClick.bind(this)
    }

    createRow(index: number) {
        let cells = []
        for (var i = 0; i < this.size; i++) {
            cells.push(<Chessboardsquare key={i} row={index} column={i}
                pieceType={this.pieceTypeOrMove(index, i)}
                selected={this.isSelected(index, i)} onHandleClick={this.handleSquareClick}/>)
        }

        return (
            <tr key={index}>
                <td>{index + 1}</td>
                {cells}
            </tr>
        )
    }

    pieceTypeOrMove(row: number, column: number) {
        let type = pieceType(row, column, this.props.pieces)
        
        for (const i in this.state.possibleMoves) {
            const coordinates = this.state.possibleMoves[i].Destination

            if (coordinates.X === row && coordinates.Y === column) {
                return "move"
            }
        }

        return type
    }

    isSelected(x: number, y: number) {
        if (this.state.selected != null) {
            if ((x === this.state.selected.X) && (y === this.state.selected.Y)) {
                return "yes"
            }
        }

        return "no"
    }
    
    handleSquareClick(x: number, y: number) {
        if (this.props.myTurn) {
            if (this.state.selected === null) {
                if (containsPieceWithColor(x, y, this.props.player, this.props.pieces)) {
                    this.setState({
                        selected: {
                            X: x,
                            Y: y,
                        },
                        possibleMoves: possibleMoves(x, y, this.props.pieces, 8)
                    })
                } else {
                    this.setState({ selected: null, possibleMoves: []})
                }
            } else {
                const moveIndex = this.state.possibleMoves.map(m => m.Destination).findIndex(c => c.X === x && c.Y === y)
                if (moveIndex !== -1) {
                    let command = {
                        Name: "move",
                        Parameters: this.state.possibleMoves[moveIndex]
                    }

                    sendMessage(JSON.stringify(command))
                }

                this.setState({
                    selected: null,
                    possibleMoves: []
                })
            }
        }
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
