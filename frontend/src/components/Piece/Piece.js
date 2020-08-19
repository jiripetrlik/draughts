import React from "react"
import "./Piece.css"
import whitepiece from "./white-piece.svg"
import blackpiece from "./black-piece.svg"
import whitequeen from "./white-queen.svg"
import blackqueen from "./black-queen.svg"

class Piece extends React.Component {
    render() {
        let image
        if (this.props.type === "white-piece") {
            image = <img src={whitepiece} alt=""/>
        } else if (this.props.type === "black-piece") {
            image = <img src={blackpiece} alt=""/>
        } else if (this.props.type === "white-queen") {
            image = <img src={whitequeen} alt=""/>
        } else if (this.props.type === "black-queen") {
            image = <img src={blackqueen} alt=""/>
        }

        return image
    }
}

export default Piece;
