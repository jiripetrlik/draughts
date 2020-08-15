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
            let color = this.rowColor(index, i)
            cells.push(<td key={i} className={color}><Chessboardsquare row={index} column={i}/></td>)
        }

        return (
            <tr key={index}>
                {cells}
            </tr>
        )
    }

    rowColor(row, column) {
        let color

        if (row % 2 === 0) {
            if (column % 2 === 0) {
                color = "light"
            } else {
                color = "dark"
            }
        } else {
            if (column % 2 === 0) {
                color = "dark"
            } else {
                color = "light"
            }
        }

        return color
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
