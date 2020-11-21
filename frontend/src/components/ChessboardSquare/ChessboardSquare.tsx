import React from "react"
import "./ChessboardSquare.css"
import Piece from "../Piece/Piece"


class ChessboardSquare extends React.Component<Readonly<any>, Readonly<any>> {
    constructor(props: any) {
        super(props)
        this.handleClick = this.handleClick.bind(this)
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

        if (this.props.selected === "yes") {
            color = color + "selected"
        }

        return color
    }

    handleClick() {
        this.props.onHandleClick(this.props.row, this.props.column)
    }
    
    render() {
        return (
            <td className={this.color()} onClick={this.handleClick}>
                {
                    this.props.pieceType !== "none" &&
                    <Piece type={this.props.pieceType}/>
                }
            </td>
        )
    }
}

export default ChessboardSquare;
