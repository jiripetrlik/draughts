import React from "react"
import "./Piece.css"
import whitepiece from "./white-piece.svg"
import blackpiece from "./black-piece.svg"
import whitequeen from "./white-queen.svg"
import blackqueen from "./black-queen.svg"
import move from "./possible-move.svg"

class Piece extends React.Component<Readonly<any>, Readonly<any>> {
    render() {
        let image
        if (this.props.type === "white-piece") {
            image = <img src={whitepiece} alt="" className="piece"/>
        } else if (this.props.type === "black-piece") {
            image = <img src={blackpiece} alt="" className="piece"/>
        } else if (this.props.type === "white-queen") {
            image = <img src={whitequeen} alt="" className="piece"/>
        } else if (this.props.type === "black-queen") {
            image = <img src={blackqueen} alt="" className="piece"/>
        } else if (this.props.type === "move") {
            image = <img src={move} alt=""/>
        }

        return image
    }
}

export default Piece;
