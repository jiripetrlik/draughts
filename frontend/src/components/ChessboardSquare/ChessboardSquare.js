import React from "react"
import "./ChessboardSquare.css"
import Piece from "../Piece/Piece"


class ChessboardSquare extends React.Component {
    render() {
        return (
            <td className={this.color()}>
                {
                    this.props.pieceType !== "none" &&
                    <Piece type={this.props.pieceType}/>
                }
            </td>
        )
    }

    color() {
        let color

        if (this.props.row % 2 === 0) {
            if (this.props.column % 2 === 0) {
                color = "light"
            } else {
                color = "dark"
            }
        } else {
            if (this.props.column % 2 === 0) {
                color = "dark"
            } else {
                color = "light"
            }
        }

        return color
    }
}

export default ChessboardSquare;
