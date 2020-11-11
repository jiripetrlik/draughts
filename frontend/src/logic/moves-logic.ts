import * as ql from "./query-logic"

function possiblePieceMoves(coordinates: ql.Coordinates, color: ql.PieceColor,
    pieces: ql.DraughtsPieces, chessboardSize: number): Array<ql.Coordinates> {
    let moves: Array<ql.Coordinates> = []
    let direction: number
    if (color === "white") {
        direction = 1
    } else {
        direction = -1
    }

    if (ql.isInChessboard(coordinates.X + direction, coordinates.Y - 1, chessboardSize)) {
        if (ql.pieceType(coordinates.X + direction, coordinates.Y - 1, pieces) === "none") {
            moves.push({ X: coordinates.X + direction, Y: coordinates.Y - 1 })
        } else if (ql.isInChessboard(coordinates.X + 2 * direction, coordinates.Y - 2, chessboardSize) &&
            ql.containsPieceWithColor(coordinates.X + direction, coordinates.Y - 1, ql.invertColor(color), pieces) &&
            ql.pieceType(coordinates.X + 2 * direction, coordinates.Y - 2, pieces) === "none") {
            moves.push({ X: coordinates.X + 2 * direction, Y: coordinates.Y - 2 })
        }
    }
    if (ql.isInChessboard(coordinates.X + direction, coordinates.Y + 1, chessboardSize)) {
        if (ql.pieceType(coordinates.X + direction, coordinates.Y + 1, pieces) === "none") {
            moves.push({ X: coordinates.X + direction, Y: coordinates.Y + 1 })
        } else if (ql.isInChessboard(coordinates.X + 2 * direction, coordinates.Y + 2, chessboardSize) &&
            ql.containsPieceWithColor(coordinates.X + direction, coordinates.Y + 1, ql.invertColor(color), pieces) &&
            ql.pieceType(coordinates.X + 2 * direction, coordinates.Y + 2, pieces) === "none") {
            moves.push({ X: coordinates.X + 2 * direction, Y: coordinates.Y + 2 })
        }
    }

    return moves
}

function possibleMoves(row: number, column: number, pieces: ql.DraughtsPieces,
    chessboardSize: number): Array<ql.Coordinates> {
    let moves: Array<ql.Coordinates> = []
    let type = ql.pieceType(row, column, pieces)

    if (type === "white-piece") {
        moves = possiblePieceMoves({ X: row, Y: column }, "white", pieces, chessboardSize)
    }
    else if (type === "black-piece") {
        moves = possiblePieceMoves({ X: row, Y: column }, "black", pieces, chessboardSize)
    }

    return moves
}

export { possibleMoves }