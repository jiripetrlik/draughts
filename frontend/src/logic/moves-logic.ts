import * as ql from "./query-logic"

interface MoveDescription {
    add: ql.DraughtsPieces
    remove: ql.DraughtsPieces
    destination: ql.Coordinates
}

function addPiece(row: number, column: number, isQueen: boolean, color: ql.PieceColor): ql.DraughtsPieces {
    let toBeAdded: ql.DraughtsPieces = {
        Whitepieces: [],
        Blackpieces: [],
        Whitequeens: [],
        Blackqueens: []
    }

    if (color === "white") {
        if (isQueen) {
            toBeAdded.Whitequeens.push({X: row, Y: column})
        } else {
            toBeAdded.Whitepieces.push({X: row, Y: column})
        }
    } else {
        if (isQueen) {
            toBeAdded.Blackqueens.push({X: row, Y: column})
        } else {
            toBeAdded.Blackpieces.push({X: row, Y: column})
        }
    }

    return toBeAdded
}

function removePieces(coordinatesArray: Array<ql.Coordinates>, pieces: ql.DraughtsPieces): ql.DraughtsPieces {
    let toBeRemoved: ql.DraughtsPieces = {
        Whitepieces: [],
        Blackpieces: [],
        Whitequeens: [],
        Blackqueens: []
    }

    for (const i in coordinatesArray) {
        const coordinates = coordinatesArray[i]
        const pieceType = ql.pieceType(coordinates.X, coordinates.Y, pieces)

        if (pieceType === "white-piece") {
            toBeRemoved.Whitepieces.push({X: coordinates.X, Y: coordinates.Y})
        } else if (pieceType === "black-piece") {
            toBeRemoved.Blackpieces.push({X: coordinates.X, Y: coordinates.Y})
        } else if (pieceType === "white-queen") {
            toBeRemoved.Whitequeens.push({X: coordinates.X, Y: coordinates.Y})
        } else if (pieceType === "black-queen") {
            toBeRemoved.Blackqueens.push({X: coordinates.X, Y: coordinates.Y})
        }
    }

    return toBeRemoved
}

function possiblePieceMoves(coordinates: ql.Coordinates, color: ql.PieceColor,
    pieces: ql.DraughtsPieces, chessboardSize: number): Array<MoveDescription> {
    let moves: Array<MoveDescription> = []
    let direction: number
    if (color === "white") {
        direction = 1
    } else {
        direction = -1
    }

    if (ql.isInChessboard(coordinates.X + direction, coordinates.Y - 1, chessboardSize)) {
        if (ql.pieceType(coordinates.X + direction, coordinates.Y - 1, pieces) === "none") {
            let move: MoveDescription = {
                add: addPiece(coordinates.X + direction, coordinates.Y - 1, false, color),
                remove: removePieces([{X: coordinates.X, Y: coordinates.Y}], pieces),
                destination: {X: coordinates.X + direction, Y: coordinates.Y - 1}
            }
            moves.push(move)
        } else if (ql.isInChessboard(coordinates.X + 2 * direction, coordinates.Y - 2, chessboardSize) &&
            ql.containsPieceWithColor(coordinates.X + direction, coordinates.Y - 1, ql.invertColor(color), pieces) &&
            ql.pieceType(coordinates.X + 2 * direction, coordinates.Y - 2, pieces) === "none") {
                let move: MoveDescription = {
                    add: addPiece(coordinates.X + 2 * direction, coordinates.Y - 2, false, color),
                    remove: removePieces([{X: coordinates.X, Y: coordinates.Y},
                        {X: coordinates.X + direction, Y: coordinates.Y - 1}], pieces),
                    destination: {X: coordinates.X + 2 * direction, Y: coordinates.Y - 2}
                }
                moves.push(move)
        }
    }
    if (ql.isInChessboard(coordinates.X + direction, coordinates.Y + 1, chessboardSize)) {
        if (ql.pieceType(coordinates.X + direction, coordinates.Y + 1, pieces) === "none") {
            let move: MoveDescription = {
                add: addPiece(coordinates.X + direction, coordinates.Y + 1, false, color),
                remove: removePieces([{X: coordinates.X, Y: coordinates.Y}], pieces),
                destination: {X: coordinates.X + direction, Y: coordinates.Y + 1}
            }
            moves.push(move)
        } else if (ql.isInChessboard(coordinates.X + 2 * direction, coordinates.Y + 2, chessboardSize) &&
            ql.containsPieceWithColor(coordinates.X + direction, coordinates.Y + 1, ql.invertColor(color), pieces) &&
            ql.pieceType(coordinates.X + 2 * direction, coordinates.Y + 2, pieces) === "none") {
                let move: MoveDescription = {
                    add: addPiece(coordinates.X + 2 * direction, coordinates.Y + 2, false, color),
                    remove: removePieces([{X: coordinates.X, Y: coordinates.Y},
                        {X: coordinates.X + direction, Y: coordinates.Y + 1}], pieces),
                        destination: {X: coordinates.X + 2 * direction, Y: coordinates.Y + 2}
                }
                moves.push(move)
        }
    }

    return moves
}

function possibleQueenMoves(coordinates: ql.Coordinates, color: ql.PieceColor,
    pieces: ql.DraughtsPieces, chessboardSize: number): Array<MoveDescription> {
        let moves: Array<MoveDescription> = []

        for (const vDirection of [-1, 1]) {
            for (const hDirection of [-1, 1]) {
                let cont = true
                let i = 1
                let jumped:Array<ql.Coordinates> = []
                
                while((cont === true) && ql.isInChessboard(coordinates.X + i * vDirection, coordinates.Y + i * hDirection, chessboardSize)) {
                    if (ql.pieceType(coordinates.X + i * vDirection, coordinates.Y + i * hDirection, pieces) === "none") {
                        moves.push({
                            add: addPiece(coordinates.X + i * vDirection, coordinates.Y + i * hDirection, true, color),
                            remove: removePieces([coordinates].concat(jumped), pieces),
                            destination: { X: coordinates.X + i * vDirection, Y: coordinates.Y + i * hDirection }
                        })
                    } else if (ql.containsPieceWithColor(coordinates.X + i * vDirection, coordinates.Y + i * hDirection, color, pieces)) {
                        cont = false
                    } else if (ql.containsPieceWithColor(coordinates.X + i * vDirection, coordinates.Y + i * hDirection, ql.invertColor(color), pieces)) {
                        jumped.push({X: coordinates.X + i * vDirection, Y: coordinates.Y + i * hDirection})
                    }
                    i++
                }
            }
        }

        return moves
}

function possibleMoves(row: number, column: number, pieces: ql.DraughtsPieces,
    chessboardSize: number): Array<MoveDescription> {
    let moves: Array<MoveDescription> = []
    let type = ql.pieceType(row, column, pieces)

    if (type === "white-piece") {
        moves = possiblePieceMoves({ X: row, Y: column }, "white", pieces, chessboardSize)
    } else if (type === "black-piece") {
        moves = possiblePieceMoves({ X: row, Y: column }, "black", pieces, chessboardSize)
    } else if (type === "white-queen") {
        moves = possibleQueenMoves({ X: row, Y: column }, "white", pieces, chessboardSize)
    } else if (type === "black-queen") {
        moves = possibleQueenMoves({ X: row, Y: column }, "black", pieces, chessboardSize)
    }

    return moves
}

export { possibleMoves }